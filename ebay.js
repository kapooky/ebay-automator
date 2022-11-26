const sqlite3 = require('sqlite3');
const eBayApi = require('ebay-api');
const fs = require("fs");
const tokenobject = require("./data.json"); 
const path = require('path');
const FormData = require('form-data');

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


const { default: OAuth2 } = require('ebay-api/lib/auth/oAuth2');
const { x } = require('tar');
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
  // const url = eBay.oAuth2.generateAuthUrl();
  // console.log('Open URL', url);
  // const token = await eBay.OAuth2.getToken("v^1.1#i^1#p^3#f^0#I^3#r^1#t^Ul41Xzk6RUExNzJBQjJFNUQ5RDUxNzg3MUYxM0ZFRjRFNDhBRjRfMV8xI0VeMjYw");
  // console.log(token);
  // console.log(JSON.stringify(token));
  // eBay.OAuth2.setCredentials(token);
  // eBay.OAuth2.mintApplicationAccessToken(); 
  // let code = await eBay.OAuth2.getToken("v%5E1.1%23i%5E1%23r%5E1%23p%5E3%23f%5E0%23I%5E3%23t%5EUl41Xzc6OEIxNDVGMjJGMkIwQjVDM0Q3MDNBMDAzRTY2QUJFQUFfMF8xI0VeMjYw")
  // console.log(code);


  array = []; 
  let ordersResult= await eBay.sell.fulfillment.getOrders({ 
    filter: "orderfulfillmentstatus:%7BNOT_STARTED%7CIN_PROGRESS%7D" });

  ordersResult.orders.forEach(e => {
    console.log(e);
    if(e.orderPaymentStatus === "PAID" && e.orderFulfillmentStatus === "NOT_STARTED" ){
      console.log("this guy payed and his order isn't shipped");

      //If order ID doesn't exist, new order
      if(!array.includes(e.orderId)){
      array.push(e.orderId)
      handleOrder(e,eBay)
      console.log(array);
      }
      // Invoke Function to Handle newOrder(); 

       // orderId  legacyOrderId
      // Push orderId to array 
    }
  });


})(); 

