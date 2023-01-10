const tokenobject = require("./data.json");
const kapooky102object = require("./kapooky102.json");
const daniellaobject = require("./data-daniella.json");
const tariqazmatdotdevObject = require("./data-tariqazmatdev.json");
var Account = require("./Account");


let listings = [{
    quantityMultiplier: 5,
    legacyItemID: ['275602449522'],
    Description: "5-Hour code",
    DBtable: "codes",
    Subject:"✅Here's your 5-hour XP codes!",
    Instructions:"Redeem at https://callofduty.com/bkredeem"


},
    {
        quantityMultiplier: 1,
        legacyItemID: ['275600358085'],
        Description: "HyperX",
        DBtable: "hyperx_codes",
        Subject:"✅Here's your HyperX code!",
        Instructions: "How to redeem your code:\n" +
            "1) Go to https://profile.callofduty.com/promotions/redeemCode\n" +
            "2) Sign into your COD account via your platform (Xbox/Ps4/BattleNet) - This can be found at the top of the page or will prompt you to once entering the code in the box. Please ensure you own the base game Call of Duty®: Modern Warfare® II on either PC / PlayStation 4 / PlayStation 5 / Xbox One / Xbox Series X|S before using this code.\n" +
            "3) Enter the code into the box and press \"Submit\"\n" +
            "4) You will see a confirmation and should be all set! Restart your game and you will have your Hyper-X Bundle on MW2 :) - Please note: On rare occasions, Activision has stated it can take up to 24 hours to display in-game however it is unlikely to happen.\n"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275591730352'],
        Description: "Jacklinks",
        DBtable: "jacklinks_codes",
        Subject:"✅Here's your Jack Link code!"
    },
]
const account = new Account(listings, "tariq", tokenobject);
const  token = new Account(listings, "kapooky102", kapooky102object);
const dotdev = new Account(listings, "dotdev",tariqazmatdotdevObject);
const daniella = new Account(listings, "daniella",daniellaobject);
// (async () => {
//     try {
//         let result = await account.api.sell.fulfillment.getOrders();
//         console.log(result);
//         console.log("hello world");
//     }
//     catch (e){
//         console.log(e)
//     }
// })();
