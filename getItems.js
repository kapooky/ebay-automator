import eBayApi from 'ebay-api'
import AWS from "aws-sdk";
import {createRequire} from "module";

const require = createRequire(import.meta.url);
const credentials = require("./data.json");

//Scan listings for many sellers
//Search Keywords --> Get listings for sellers
// Each




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


let api = new eBayApi(OBJECT);
api.OAuth2.setCredentials(credentials);
//console.log(this.api)

// this.api.sell.fulfillment.getOrders().then(x => {
//     console.log(x)
// }).catch(e => {
//     console.log(e);
// })

api.OAuth2.on('refreshAuthToken', (token) => {
    credentials.access_token = token.access_token;
    credentials.expires_in = token.expires_in;
    credentials.refresh_token = token.refresh_token;
    credentials.refresh_token_expires_in = token.refresh_token_expires_in;
    credentials.token_type = token.token_type;
    credentials.date = Date().toString();
});

//    console.log("we're working working");
setTimeout(() => {
    // this.setIntervalAsync()
}, 8000);

const Objects = [
    {
        mylisting: "225471844423",
        his: "304841122541",
        limit: 10
    },
];

function urlconstructor(itemid) {
    return `https://www.ebay.com/itm/${itemid}`
}

(async () => {

   let id = '304841122541'
       await api.buy.browse.getItem(`v1|${id}|0`);
})();
// (async () => {
//     console.log("am I running");
//     for (const listing of Objects) {
//         console.log("am I running");
//         let his,mine;
//         try{
//          his = await api.buy.browse.getItem(`v1|${listing.his}|0`);
//          mine = await api.buy.browse.getItem(`v1|${listing.mylisting}|0`);
//
//             const hisSold = his.estimatedAvailabilities[0].estimatedSoldQuantity;
//             const mySold = mine.estimatedAvailabilities[0].estimatedSoldQuantity;
//             const hisPrice = Number(his.price.value);
//             const myPrice = Number(mine.price.value);
//
//
//             let friendlyString  = `${his.title} Hisprice: ${hisPrice}|Sold: ${hisSold} and myPrice ${myPrice}|Sold: ${mySold} LIMIT: $${listing.limit} USD`;
//
//             console.log(friendlyString)
//             console.log(urlconstructor(listing.mylisting));
//             console.log(urlconstructor(listing.his));
//             if (hisPrice > listing.limit && myPrice >= hisPrice) {
//
//
//
//                 let result = api.trading.ReviseFixedPriceItem({
//                     Item: {
//                         ItemID: listing.mylisting,
//                         // StartPrice: hisPrice - Math.floor(Math.random()*10)/10
//                         StartPrice: hisPrice - 0.02
//                     }
//                 });
//             }
//
//         }
//         catch(e){
//             console.log(e);
//
//         }
//
//
//     }
//
//     // for (const listing of Objects) {
//     //     console.log(urlconstructor(listing.mylisting));
//     //      console.log(urlconstructor(listing.his));
//     // }
// })();


