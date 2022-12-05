const eBayApi = require('ebay-api');
const fs = require("fs");
const tokenobject = require("./data-daniella.json");
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

        //Update the token
        // fs.writeFileSync('./data.json', json.toString())
    })

}


const eBay = new eBayApi({
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

});

// listen to refresh token event
eBay.OAuth2.on('refreshAuthToken', (token) => {
    updateTokenJSON(token);
});

eBay.OAuth2.setCredentials(tokenobject);

(async () => {
 //   const url = eBay.oAuth2.generateAuthUrl();
   // console.log('Open URL', url);
   // const token = await eBay.OAuth2.getToken("v^1.1#i^1#I^3#p^3#r^1#f^0#t^Ul41XzY6NDg1NkJFMDg1QUZCOEJFNzJEMjBFRjI2NEIzNTJBOENfMV8xI0VeMjYw");
    console.log("h");
    setIntervalAsync(mainLoop, 10000);

})();


async function mainLoop(){
    console.log("Daniella looping...");
    let ordersResult= await eBay.sell.fulfillment.getOrders({
        filter: "orderfulfillmentstatus:%7BNOT_STARTED%7CIN_PROGRESS%7D" });

    for (const e of ordersResult.orders){
        console.log(e);
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
                handleOrder(e,eBay);
                break; //Exit out of the loop,

            }
        }
    }
}

