'use strict';
import {Listing} from "./d";


import ebay from  'ebay-api'
import Order from './Order.js';
import AWS from 'aws-sdk';
import { setIntervalAsync} from 'set-interval-async'

import   puppeteer from 'puppeteer-extra'
//const pluginStealth = require("puppeteer-extra-plugin-stealth")
import  pluginStealth from 'puppeteer-extra-plugin-stealth'
import querystring from "querystring";
import fs from "fs";


//AWS.config.update({region: 'us-east-1'});


export default class Account {
    DEFAULT_LISTING;
    listings: Listing[]
    name: string
    api;
    ddb;

   constructor(listings: Listing[], name, credentials) {
        const OBJECT = {
            appId: "DigiCode-random-PRD-b95ffe9b2-9d5b5437",
            devId: "2b226866-26d5-4e3f-83de-4cbff643f2e7",
            ruName: "DigiCodes-DigiCode-random-rykcv",
            certId: "PRD-ac65bf938e91-cd12-4384-a7ed-bfd7",
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
            await this.loop();
            setIntervalAsync(() => {this.loop()},8000);
        }

        catch (e){
            this.sendAlert(`Interval had a Problem: ${e}`);
        }
    }

    private async handleError(e){
       //Check what is the error about?
        //check if the reason is because of an invalid token
        //if the reason is because of an invalid token, then retrieve code to initiate a new browser instance
        //
    }
     private async loop() {
        console.log(`looping...${this.name}`);
        let ordersResult= await this.api.sell.fulfillment.getOrders({
            filter: "orderfulfillmentstatus:%7BNOT_STARTED%7CIN_PROGRESS%7D" }).catch(async e => {

            console.log(`This error occured in the catchall loop function ${e}`);
            if(e == `EBayError: invalid_client`){
                console.log("Inside the loop");
                const token  = await this.initiateBrowser();
                console.log("going into retrieve function");
                const result = await this.retrieveandSaveToken(token)





            }
            await this.handleError(e);
            throw e;
        });

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
                     orderObject.handleOrder(e);
                    // setTimeout(() =>{
                    //     Destr;
                    // })
                }
            }
        };
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async initiateBrowser(){


        puppeteer.use(pluginStealth())
//const chromeLauncher = require('chrome-launcher');
        const chromeConfig = {
            chromePath: "/usr/bin/google-chrome-stable",
            userDataDir:"/home/tariq/.config/google-chrome/Default"
            //  chromePath: "/usr/bin/google-chrome"
        };
        const browser = await puppeteer.connect({browserWSEndpoint: "ws://127.0.0.1:9222/devtools/browser/54c2ab7c-3e8f-45a4-ad06-168d9fd3da58" });
        const page = await browser.newPage();
        await page.goto('https://auth.ebay.com/oauth2/authorize?client_id=DigiCode-random-PRD-b95ffe9b2-9d5b5437&redirect_uri=DigiCodes-DigiCode-random-rykcv&response_type=code&state=&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.marketing.readonly%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.marketing%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory.readonly%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account.readonly%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.fulfillment%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.finances');
        await this.sleep(3000);

        const token =  page.url();
        console.log(token);
        return token;
    }

    async retrieveandSaveToken(token){
            // @ts-ignore
        const parsedUrl = querystring.parse(token,undefined,undefined, {decode : true}).code
            console.log(parsedUrl);
            const otherToken = parsedUrl;
            if(otherToken){
                console.log("trying to call the api");
           //     await this.sleep(5000)
                // This would be the happiest method of all time.
                let value =  await this.api.OAuth2.obtainToken(otherToken);
                console.log(value);
                //const fileName = '/home/tariq/github/ebay-automator/data.json'
                const fileName = '/home/tariq/github/ebay-automator/data-tariqazmatdev.json'
                const data = value;

                try {
                    fs.writeFileSync(fileName, JSON.stringify(data));
                    console.log("File has been saved.");
                } catch (error) {
                    console.error(error);
                }
                console.log(JSON.stringify(value));
            }
            // invokeAccounts(eBay,kapooky102);
    }
    
}
