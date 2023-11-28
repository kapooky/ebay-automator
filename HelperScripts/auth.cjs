const eBayApi = require('ebay-api');
const fs = require("fs");
const tokenobject = require("../data.json");
const  daniellaobject= require("../data-daniella.json");
const tariqazmatdotdevObject = require("../data-tariqazmatdev.json");

const prompt = require('prompt-sync')();
const url = require('url');
const querystring = require("querystring");



const { setIntervalAsync} = require('set-interval-async');


var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
let ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


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



const eBay = new eBayApi(OBJECT);
const daniella = new eBayApi(OBJECT);
const tariqazmatdotdev = new eBayApi(OBJECT);

eBay.OAuth2.setCredentials(tokenobject);
eBay.name = "main";


daniella.OAuth2.setCredentials(daniellaobject);
daniella.name = "daniella";

tariqazmatdotdev.OAuth2.setCredentials(tariqazmatdotdevObject);
tariqazmatdotdev.name = "tariqazmat.dev";

// listen to refresh token event
// eBay.OAuth2.on('refreshAuthToken', (token) => {
//     jsonReader("./data.json",(err,json) => {
//         if(err){
//             console.log(err);
//             return;
//         }
//         json.access_token = token.access_token;
//         json.expires_in = token.expires_in;
//         json.refresh_token = token.refresh_token;
//         json.refresh_token_expires_in = token.refresh_token_expires_in;
//         json.token_type = token.token_type;
//         json.date = Date().toString();
//     })
//
// });

(async () => {
    const url = eBay.oAuth2.generateAuthUrl();
    console.log('Open URL', url);
    const token = prompt('What is your name?');
   // const token = "https://signin.ebay.com/ws/eBayISAPI.dll?ThirdPartyAuthSucessFailure&isAuthSuccessful=true&code=v%5E1.1%23i%5E1%23p%5E3%23r%5E1%23I%5E3%23f%5E0%23t%5EUl41XzE6MUUxNkYyQzI5QzNFNzA2OEM0NDU5RDkwNTQ1NjA3MjJfMl8xI0VeMjYw&expires_in=299";
    console.log(`Hey there ${token}`);

    const parsedUrl = querystring.parse(token,undefined,undefined, {decode : true}).code
    console.log(parsedUrl);
    const otherToken = parsedUrl;
    if(otherToken != undefined){
       let value =  await eBay.OAuth2.getToken(otherToken);
        console.log(value);
      //const fileName = '/home/tariq/github/ebay-automator/data.json'
       const fileName = '/home/tariq/github/ebay-automator/data-tariqazmatdev.json'
        const fs = require('fs');
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
})();