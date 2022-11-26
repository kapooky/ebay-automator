const sqlite3 = require('sqlite3');
const eBayApi = require('ebay-api');
const fs = require("fs");
const tokenobject = require("./data.json"); 

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
    // json.j
    //Update the token 
    const jsonString = JSON.stringify(customer);
    fs.writeFileSync('./data.json', jsonString)
  })
  
}


const { default: OAuth2 } = require('ebay-api/lib/auth/oAuth2');
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
   // scope: [  'https://api.ebay.com/oauth/api_scope']
    //'https://api.ebay.com/oauth/api_scope/sell.fulfillment']
    

}); 


(async () => {
  const url = eBay.oAuth2.generateAuthUrl();
  console.log('Open URL', url);
  const token = await eBay.OAuth2.getToken("v^1.1#i^1#r^1#f^0#p^3#I^3#t^Ul41Xzc6OUM5MDY4NUU1NURERkFFNTM5NTM4MzA5NkNFOTlFMTBfMl8xI0VeMjYw");
  console.log(token);
  console.log(JSON.stringify(token));
  eBay.OAuth2.setCredentials(token);
  // eBay.OAuth2.mintApplicationAccessToken(); 
  // let code = await eBay.OAuth2.getToken("v%5E1.1%23i%5E1%23r%5E1%23p%5E3%23f%5E0%23I%5E3%23t%5EUl41Xzc6OEIxNDVGMjJGMkIwQjVDM0Q3MDNBMDAzRTY2QUJFQUFfMF8xI0VeMjYw")
  // console.log(code);

eBay.trading.GetMyeBaySelling({
    SoldList: {
        Include: true,
        OrderStatusFilter: 'AwaitingPayment',
        Pagination: {
            EntriesPerPage: 20,
            PageNumber: 1
        }
    }
}).then(result => {
    console.log(JSON.stringify(result, null, 2));
}).catch(e => {
    console.error(e);
})
})(); 

