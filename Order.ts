'use strict';
import AWS from 'aws-sdk'
//AWS.config.update({region: 'us-east-1'});
import {Index, Listing, listingType} from './d.js'
import {delay, fetchcodes, recordTransaction} from "./dynamodb.js"


interface bundleCodes {
    quantityMultiplier: number,
    DBtable: string
}

const DEFAULT_LISTING:Listing =
    {
        quantityMultiplier: 1,
        Description: "The default listing for this account",
        legacyItemID: ['275586756168'], //Array of all items
        DBtable: Index.codes,
        Game: listingType.COD,
        Subject: "✅Here's your MW2 Burger Town Code!",
        Instructions: "Redeem at https://callofduty.com/bkredeem"

    };


export default class Order {
    DEFAULT_LISTING;
    name: string
    ddb;
    e;
    account;

    constructor(account, e) {
        this.account = account;
        this.e = e
        this.ddb = new AWS.DynamoDB({apiVersion: '2012-08-10',
            region: 'us-east-1'
        });
        this.DEFAULT_LISTING = DEFAULT_LISTING;
       // this.handleOrder(e);
    }
    determineListings(e) {
        console.log(this.account.listings)
        console.log(e.lineItems)
        //Check which Listing
        let foundListing;

        for(const listing of this.account.listings){
            if(listing.legacyItemID.find(item => item === e.lineItems[0].legacyItemId)){
                foundListing = listing;
                break;
            }
        }
        if (foundListing){
            console.log("Found listing", foundListing);
            return foundListing;
        }
            console.log("did not find listing")
            return DEFAULT_LISTING
    }
    async handleBundle(quantity, listing:Listing, buyername :string){
        let codes = [];
        let links = [];

        console.log("listing" + JSON.stringify(listing))
        for(const bundleItem of listing.bundleCodes){
            let obj = await fetchcodes(quantity * bundleItem.quantityMultiplier,buyername,bundleItem.DBtable);
           codes = codes.concat(obj.codes);
            links = links.concat(obj.links);
            console.log("obj"  + JSON.stringify(obj));
        }
        console.log("The final array is" + JSON.stringify({codes,links}));
        return {codes,links}
    }

     async handleOrder(order) {
        const listing = this.determineListings(order); // Determine what Listing
        let count = order.lineItems[0].quantity * listing.quantityMultiplier;

        console.log("the Quantity is " + count);
        let buyername = order.buyer.username;
        let address = order.buyer.taxAddress;

        const {codes, links} = listing.Type === "Bundle" ? await this.handleBundle(count, listing,buyername) : await fetchcodes(count, buyername,listing.DBtable)

        console.log(codes)

        const messageObject = {
            buyername: buyername,
            id: order.lineItems[0].legacyItemId,
            s3links: codes,
            links: links
        }

         console.log(messageObject)

        //Record the transaction First
        try{
            await recordTransaction(order.legacyOrderId.toString(), codes.toString(), buyername, address);
            let messageResult = await this.sendOrderMessage(messageObject,listing).catch((e) => {
                console.log(e);
                throw e;
            });
            await delay(60000);
            await this.sendGoodbyeMessage(messageObject,listing).catch((e) => {
                console.log(e);
                throw e;
            });
           await this.markasShipped(order)
        }
        catch (e){
            console.log(e)
            throw e;
        }
        console.log("RESULT FINISHED");
    }

    async markasShipped(order) {
        await this.account.api.sell.fulfillment.createShippingFulfillment(order.legacyOrderId, {
            lineItems: [
                {
                    lineItemId: order.lineItems[0].lineItemId,
                    quantity: order.lineItems[0].quantity
                }
            ]
        }).catch(e => {
            console.log(e);
            throw e;
        })
    }

    async sendOrderMessage(obj, listing) {
        console.log(this.account.api)
        let body = "Here are your code(s):\n"
        for (let i = 0; i < obj.s3links.length; i++) {
            body += `${i+1}. ${obj.s3links[i].toString().replace(/-/g, "")}`;
            //body += `${i+1}. ${obj.s3links[i].toString()}`;
            body += "\n"
        }

            body += listing.Instructions;
        body += "\n Thank you for your purchase! And I hope I get to see you again!";
        if (obj.links.length > 0) {//todo This will be invoked even if obj.links == 0
            body += '\n\n P.S: Are you getting the error, "Code needs to be 12-15 characters long"?';
            body += "\n" + "If so, please manually enter the code from the image link(s) below👇" + "\n";
            obj.links.map((link,index)=> {
                let count = index + 1
                body += `${count}. ${link}\n`;
            })
        }
        console.log(body);

        let result = await this.account.api.trading.AddMemberMessageAAQToPartner({
            ItemID: obj.id,
            MemberMessage: {
                Body: body.toString(),
                QuestionType: "CustomizedSubject",
                Subject: listing.Subject,
                RecipientID: obj.buyername
            },
        }).catch((e) => {
            console.log(e);
        });
    }
    test(){
        console.log("hello world");
    }

    async sendGoodbyeMessage(obj,listing) {
        // Send Message
        let message =  "Enjoy your rewards! Please have a look at my other ads! \n Kind Regards, John"


        if (listing.Game === listingType.HALO) {
            message = "If you buy another Halo item off me, I'll throw in a Halo Infinite - 2XP and 2 Challenge Swap for free, \n John"
        }

        let result = await this.account.api.trading.AddMemberMessageAAQToPartner({
            ItemID: obj.id,
            MemberMessage: {
                Body: message,
                QuestionType: "CustomizedSubject",
                Subject: "Hope everything went well",
                RecipientID: obj.buyername
            },
        });
    }
}
