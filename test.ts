const tokenobject = require("./data.json");
const kapooky102object = require("./kapooky102.json");
const daniellaobject = require("./data-daniella.json");
const tariqazmatdotdevObject = require("./data-tariqazmatdev.json");
var Account = require("./Account.ts");
var Order = require("./Order.ts");


const listings = [{
    quantityMultiplier: 5,
    legacyItemID: 275602449522,
    Description: "5-Hour code",
    DBtable: "codes"
},
    {
        quantityMultiplier: 1,
        legacyItemID: 275600358085,
        Description: "HyperX",
        DBtable: "hyperx_codes"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: 275591730352,
        Description: "Jacklinks",
        DBtable: "jacklinks_codes"
    },
]
const account = new Account(listings, "tariq", tokenobject);
(async () => {
    console.log(await account.api.getOrders);

})();