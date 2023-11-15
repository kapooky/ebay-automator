'use strict';
import {Listing} from "./d";


import ebay from  'ebay-api'
import Order from './Order.js';
import AWS from 'aws-sdk';
import { setIntervalAsync} from 'set-interval-async'

//AWS.config.update({region: 'us-east-1'});


export default class Account {
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

        this.listings = listings;
        this.ddb = new AWS.DynamoDB({apiVersion: '2012-08-10',
           region: 'us-east-1'
       });
        this.name = name;
        this.api = new ebay(OBJECT);
        this.api.OAuth2.setCredentials(credentials);
       //console.log(this.api)

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

   //    console.log("we're working working");
       setTimeout(() => {
           this.setIntervalAsync()
       },15000);
   }

   sendAlert(message){
       let params = {
           Message: message, /* required */
           TopicArn: 'arn:aws:sns:us-east-1:611105091336:ErrorEbay'
       };

// Create promise and SNS service object
       let publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31',
           region: 'us-east-1'
       }).publish(params).promise();

   }


    addlisting(listing: Listing){
        this.listings.push(listing);
        return this.listings;
    }

    async setIntervalAsync (){
        try{
            console.log("we're working");
            setIntervalAsync(() => {this.loop()},9000);
        }

        catch (e){
            this.sendAlert(`Interval had a Problem: ${e}`);
        }
    }

     private async loop() {
        console.log(`looping...${this.name}`);
        let ordersResult= await this.api.sell.fulfillment.getOrders({
            filter: "orderfulfillmentstatus:%7BNOT_STARTED%7CIN_PROGRESS%7D" });

        for (const e of ordersResult.orders){
            console.log(`Unshipped order in ${this.name} account from ${e.buyer.username} and title: ${e.lineItems["0"].title}, Quantity: ${e.lineItems[0].quantity} `);
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
                    this.sendAlert(`Unshipped order in ${this.name} account from ${e.buyer.username} and title: ${e.lineItems["0"].title}, Quantity: ${e.lineItems[0].quantity} `);
                    console.log("There is an Item")
                    let  orderObject = new Order(this,e);
                    await orderObject.handleOrder(e);
                    // setTimeout(() =>{
                    //     Destr;
                    // })
                }
            }
        };
    }


    
}
