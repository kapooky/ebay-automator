import {Listing} from "./d";
import Account from "./Account.js";

import { createRequire } from "module";

const require = createRequire(import.meta.url);

const tokenobject = require("./data.json");
const kapooky102object = require("./kapooky102.json");
const daniellaobject = require("./data-daniella.json");
const tariqazmatdotdevObject = require("./data-tariqazmatdev.json");

let listings :Listing[] = [{
    quantityMultiplier: 5,
    legacyItemID: ['275602449522','275621619754','225361736511','285119694121','275641135685','314358285350'],
    Description: "5-Hour code",
    DBtable: "codes",
    Subject: "✅Here's your 5-hour XP codes!",
    Instructions: "Redeem at https://callofduty.com/bkredeem"
},
    {
        quantityMultiplier: 10,
        legacyItemID: ['275619118081','275621234088','275621979129','225361664908','275632894735','285108201011','314335765331'],
        Description: "10-Hour code",
        DBtable: "codes",
        Subject: "✅Here's your 10-hour XP codes!",
        Instructions: "Redeem at https://callofduty.com/bkredeem"

    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275586756168'],
        Description: "HyperX",
        DBtable: "codes",
        Subject: "✅Here's your MW2 Burger Town Code!",
        Instructions: "Redeem at https://callofduty.com/bkredeem"
    },
    {
        quantityMultiplier: 10,
        legacyItemID: ['275637402113'],
        Description: "WEAPONS XP",
        DBtable: "5hour2xp10codes",
        Subject: "✅Here's your Weapons XP Bundle!",
        Instructions: "Redeem at mtndewgaming.com"
    },
    {
        quantityMultiplier: 1,
        Type: "Bundle",
        Description: "The default listing for this account",
        legacyItemID: ['275619146085'], //Array of all items
        bundleCodes: [
            {
                DBtable: "codes",
                quantityMultiplier: 1,
            },
            {
                DBtable: "jacklinks",
                quantityMultiplier: 4,
            }
        ],

        Subject: "✅Here is your 4x Jacklinks &amp; BurgerTown Bundle!",
        Instructions: "The first code is Burger town. Redeem at https://callofduty.com/bkredeem" +
           "\n The rest are JackLink Codes redeem at https://callofduty.com/jacklinks"

    },
    {
        quantityMultiplier: 4,
        legacyItemID: ['275643639009','285123168830'],
        Description: "Canada WeaponsXP 30MINS",
        DBtable: "weaponsXPCANADA",
        Subject: "✅Here is your Mountain Dew codes!",
        Instructions: "In order to redeem it, you need to create an account on the CANADIAN site: https://mtndewgaming.ca\n" +
            "It will ask for a Canadian address, it doesn't matter which one. \n Use https://www.bestrandoms.com/random-address-in-ca to find a random Canadian address.\n" +
            "\n" +
            "After creating the account, you will be automatically redirected to Activision to link your account.\n" +
            "Then you can enter the code on the homepage of https://mtndewgaming.ca\n" +
            "\n"
    },
];
const account = new Account(listings, "tariq", tokenobject);
const token = new Account(listings, "kapooky102", kapooky102object);
const dotdev = new Account(listings, "dotdev", tariqazmatdotdevObject);
const daniella = new Account(listings, "daniella", daniellaobject);
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
