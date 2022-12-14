const eBayApi = require('ebay-api');
const fs = require("fs");
const tokenobject = require("./data.json");
const kapooky102object = require("./kapooky102.json");
const  daniellaobject= require("./data-daniella.json");
const tariqazmatdotdevObject = require("./data-tariqazmatdev.json");

const { setIntervalAsync} = require('set-interval-async');


var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
let ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const handleOrder = require('./handleOrder.js');

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}

function updateTokenJSON(token) {
    jsonReader("./data.json",(err,json) => {
        if(err){
            console.log(err);
            return;
        }
        json.access_token = token.access_token;
        json.expires_in = token.expires_in;
        json.refresh_token = token.refresh_token;
        json.refresh_token_expires_in = token.refresh_token_expires_in;
        json.token_type = token.token_type;
        json.date = Date().toString();

        //Update the token
        // fs.writeFileSync('./data.json', json.toString())
    })

}

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


const eBay = new eBayApi(OBJECT);
const kapooky102 = new eBayApi(OBJECT);
const daniella = new eBayApi(OBJECT);
const tariqazmatdotdev = new eBayApi(OBJECT);

eBay.OAuth2.setCredentials(tokenobject);
eBay.name = "main";

kapooky102.OAuth2.setCredentials(kapooky102object);
kapooky102.name = "kapooky102";

daniella.OAuth2.setCredentials(daniellaobject);
daniella.name = "daniella";

tariqazmatdotdev.OAuth2.setCredentials(tariqazmatdotdevObject);
tariqazmatdotdev.name = "tariqazmat.dev";

// listen to refresh token event
eBay.OAuth2.on('refreshAuthToken', (token) => {
    jsonReader("./data.json",(err,json) => {
        if(err){
            console.log(err);
            return;
        }
        json.access_token = token.access_token;
        json.expires_in = token.expires_in;
        json.refresh_token = token.refresh_token;
        json.refresh_token_expires_in = token.refresh_token_expires_in;
        json.token_type = token.token_type;
        json.date = Date().toString();
    })

});
kapooky102.OAuth2.on('refreshAuthToken', (token) => {
    jsonReader("./kapooky102.json",(err,json) => {
        if(err){
            console.log(err);
            return;
        }
        json.access_token = token.access_token;
        json.expires_in = token.expires_in;
        json.refresh_token = token.refresh_token;
        json.refresh_token_expires_in = token.refresh_token_expires_in;
        json.token_type = token.token_type;
        json.date = Date().toString();
    })

});

daniella.OAuth2.on('refreshAuthToken', (token) => {
    jsonReader("./data-daniella.json",(err,json) => {
        if(err){
            console.log(err);
            return;
        }
        json.access_token = token.access_token;
        json.expires_in = token.expires_in;
        json.refresh_token = token.refresh_token;
        json.refresh_token_expires_in = token.refresh_token_expires_in;
        json.token_type = token.token_type;
        json.date = Date().toString();
    })

});


(async () => {
   // const url = eBay.oAuth2.generateAuthUrl();
   // console.log('Open URL', url);
   //  const otherToken = await eBay.OAuth2.getToken("v^1.1#i^1#r^1#p^3#I^3#f^0#t^Ul41XzI6QzBGNjIxOERFQzUzNTcxNjQwQzRDNERDREUzREE3RjFfMF8xI0VeMjYw");
   // console.log(JSON.stringify(otherToken));
    invokeAccounts(eBay,kapooky102);
})();

async function invokeAccounts(main,kapooky102){
    //setIntervalAsync(mainLoop(main),10000);
    setIntervalAsync(() => {mainLoop(main)},10000);
    setIntervalAsync(() => {mainLoop(kapooky102)},13000);
    setIntervalAsync(() => {mainLoop(daniella)},16000);
    setIntervalAsync(() => {mainLoop(tariqazmatdotdev)},1500);
}

async function mainLoop(api){
    console.log(`looping...${api.name}`);
    let ordersResult= await api.sell.fulfillment.getOrders({
        filter: "orderfulfillmentstatus:%7BNOT_STARTED%7CIN_PROGRESS%7D" });

    for (const e of ordersResult.orders){
        console.log(`Unshipped order in ${api.name} account from ${e.buyer.username}`);
        if(e.orderPaymentStatus === "PAID" && e.orderFulfillmentStatus === "NOT_STARTED" ){
            let params = {
                TableName: 'orders',
                Key: {
                    "orderid" : {S: e.legacyOrderId.toString()}
                }};

            let check = await ddb.getItem(params).promise().catch(e => {throw e});

            //If order ID doesn't exist, add new order
            console.log("Is there a value in dymnabodb?: " + check.item);
            if(!check.Item){
                console.log("There is an Item")
                handleOrder(e,api)

            }
        }
    };
}


