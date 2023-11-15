const eBayApi = require('ebay-api');
const tokenObject = require("../data.json");

item = {
    // Item: {
    //
    // }
};
const eBay = new eBayApi({
    appId: "TariqAzm-sandbox-PRD-d7db68d0a-ec165db0",
    devId: "79fd9488-d650-4518-a549-1829967ab2e5",
    ruName: "Tariq_Azmat-TariqAzm-sandbo-zgqwh",
    certId: "PRD-95ffe9b24864-22b1-47d9-b8b9-8254",
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

( async () => {
    eBay.OAuth2.setCredentials(tokenObject);
    // let ordersResult = await  eBay.sell.fulfillment.getOrders({
    //     filter: "orderfulfillmentstatus:%7BNOT_STARTED%7CIN_PROGRESS%7D"
    // });

    let listings = await eBay.trading.GetMyeBaySelling({
        ActiveList: {
            Include: true
        }
    }).catch((e) => {
        console.log(e);
    });
    // let addListing = await eBay.trading.AddFixedPriceItem(item).catch((e) => {
    //     console.log(e);
    // });

    console.log(JSON.stringify(listings,null, 3));
   // console.log(addListing);
})();


