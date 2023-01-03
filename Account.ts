'use strict';
let ebay = require('ebay-api');
const order = require('./Order.ts');
var AWS = require('aws-sdk');
const { setIntervalAsync} = require('set-interval-async');
AWS.config.update({region: 'us-east-1'});



interface Listing {
    quantityMultiplier: number,
    legacyItemID: number,
    Description?: string,
    DBtable: string
}

module.exports =  class Account {
    DEFAULT_LISTING;
    listings: Listing[]
    name: string
    api;
    ddb;

   constructor(listings: Listing[], name, credentials) {
        const OBJECT = {
            appId: "TariqAzm-sandbox-PRD-d7db68d0a-ec165db0",
            devId: "79fd9488-d650-4518-a549-1829967ab2e5",
            ruName: "Tariq_Azmat-TariqAzm-sandbo-zgqwh",
            certId: "PRD-7db68d0a3879-c04f-4580-a161-105e",
            sandbox: false,
            autoRefreshToken: true,

            scope: [
                'https://api.ebay.com/oauth/api_scope',
                'https://api.ebay.com/oauth/api_scope/sell.marketing.readonly',
                'https://api.ebay.com/oauth/api_scope/sell.marketing',
                'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly',
                'https://api.ebay.com/oauth/api_scope/sell.inventory',
                'https://api.ebay.com/oauth/api_scope/sell.account.readonly',
                'https://api.ebay.com/oauth/api_scope/sell.account',
                'https://api.ebay.com/oauth/api_scope/sell.fulfillment',
                'https://api.ebay.com/oauth/api_scope/sell.finances'
            ]
        }

        this.listings = [];
        this.ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
        this.name = name;
        this.api = new ebay(OBJECT);
        this.api.OAuth2.setCredentials(credentials);

        // this.api.sell.fulfillment.getOrders().then(x => {
        //     console.log(x)
        // }).catch(e => {
        //     console.log(e);
        // })

        this.api.OAuth2.on('refreshAuthToken', (token) => {
               credentials.access_token = token.access_token;
               credentials.expires_in = token.expires_in;
               credentials.refresh_token = token.refresh_token;
               credentials.refresh_token_expires_in = token.refresh_token_expires_in;
               credentials.token_type = token.token_type;
               credentials.date = Date().toString();
        });

   }

   sendAlert(message){
       let params = {
           Message: message, /* required */
           TopicArn: 'arn:aws:sns:us-east-1:611105091336:ErrorEbay'
       };

// Create promise and SNS service object
       let publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

   }


    addlisting(listing: Listing){
        this.listings.push(listing);
        return this.listings;
    }

    async setIntervalAsync (){
        try{
            setIntervalAsync(() => {this.loop()},10000);
        }

        catch (e){
            this.sendAlert("Interval had a Problem")
            this.sendAlert(e);
        }
    }

     private async loop() {
        console.log(`looping...${this.api.name}`);
        let ordersResult= await this.api.sell.fulfillment.getOrders({
            filter: "orderfulfillmentstatus:%7BNOT_STARTED%7CIN_PROGRESS%7D" });

        for (const e of ordersResult.orders){
            console.log(`Unshipped order in ${this.api.name} account from ${e.buyer.username} and title: ${e.lineItems["0"].title}, Quantity: ${e.lineItems[0].quantity} `);
            if(e.orderPaymentStatus === "PAID" && e.orderFulfillmentStatus === "NOT_STARTED" ){
                let params = {
                    TableName: 'orders',
                    Key: {
                        "orderid" : {S: e.legacyOrderId.toString()}
                    }};

                let check = await this.ddb.getItem(params).promise().catch(e => {throw e});

                //If order ID doesn't exist, add new order
                console.log("Is there a value in dymnabodb?: " + check.item);
                if(!check.Item){
                    console.log("There is an Item")
                    let value = new order(this.api,this.listings,e);
                }
            }
        };
    }
}
