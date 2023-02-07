import {Index, Listing, listingType} from "./d.js";
import Account from "./Account.js";

import {createRequire} from "module";

const require = createRequire(import.meta.url);

const tokenobject = require("./data.json");
const kapooky102object = require("./kapooky102.json");
const daniellaobject = require("./data-daniella.json");
const tariqazmatdotdevObject = require("./data-tariqazmatdev.json");

let listings: Listing[] = [{
    quantityMultiplier: 5,
    legacyItemID: ['275602449522', '275621619754', '225361736511', '285119694121', '275641135685', '314358285350'],
    Description: "5-Hour code",
    DBtable: Index.codes,
    Game: listingType.COD,
    Subject: "✅Here's your 5-hour XP codes!",
    Instructions: "Redeem at https://callofduty.com/bkredeem"
},
    {
        quantityMultiplier: 10,
        legacyItemID: ['275619118081', '275621234088', '275621979129', '225361664908', '275632894735', '285108201011', '314335765331'],
        Description: "10-Hour code",
        DBtable: Index.codes,
        Game: listingType.COD,
        Subject: "✅Here's your 10-hour XP codes!",
        Instructions: "Redeem at https://callofduty.com/bkredeem"

    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275586756168'],
        Description: "HyperX",
        DBtable: Index.codes,
        Game: listingType.COD,
        Subject: "✅Here's your MW2 Burger Town Code!",
        Instructions: "Redeem at https://callofduty.com/bkredeem"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275663760898','275591730352'],
        Description: "jacklinks 1 code only",
        DBtable: Index.Jacklinks,
        Game: listingType.COD,
        Subject: "✅Here's your JackLinks Code!",
        Instructions: "Redeem at https://callofduty.com/jacklinks"
    },
    {
        quantityMultiplier: 4,
        legacyItemID: ['275671334780'],
        Description: "jacklinks 4 codes only",
        DBtable: Index.Jacklinks,
        Game: listingType.COD,
        Subject: "✅Here's your JackLinks Code!",
        Instructions: "Redeem at https://callofduty.com/jacklinks"
    },
    {
        quantityMultiplier: 10,
        legacyItemID: ['275637402113'],
        Description: "WEAPONS XP",
        DBtable: Index.WeaponsXPUSA,
        Game: listingType.COD,
        Subject: "✅Here's your Weapons XP Bundle!",
        Instructions: "Redeem at mtndewgaming.com"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275663681858'],
        Description: "Sea Of Thieves",
        DBtable: Index.Sea_Of_Thieves,
        Game: listingType.COD,
        Subject: "✅Here's your Sea of Thieves Steam Key!",
        Instructions: "Redeem on the Steam APP!"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['314372690234', '275663879112','314372690234'],
        Description: "Halo Oreo",
        DBtable: Index.Halo_Oreo,
        Game: listingType.HALO,
        Subject: "✅Here's your Halo Oreo Key!",
        Instructions: "Go to Halowaypoint.com/redeem"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['134438207150'],
        Description: "Roblox 100",
        DBtable: Index.Roblox100,
        Game: listingType.ROBLOX,
        Subject: "✅Here's your Roblox 100 Key!",
        Instructions: "Go to www.roblox.com/redeem"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275666669227'],
        Description: "Halo SPNKR",
        DBtable: Index.Halo_spnkr,
        Game: listingType.HALO,
        Subject: "✅Here's your Halo SPNKR Key!",
        Instructions: "Go to Halowaypoint.com/redeem"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275666523155'],
        Description: "Halo Hydra",
        DBtable: Index.Halo_hydra,
        Game: listingType.HALO,
        Subject: "✅Here's your Halo Hydra Key!",
        Instructions: "Go to Halowaypoint.com/redeem"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275666668552'],
        Description: "Halo razerback",
        DBtable: Index.Halo_RAZERBACK,
        Game: listingType.HALO,
        Subject: "✅Here's your Halo Razerback Key!",
        Instructions: "Go to Halowaypoint.com/redeem "
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275619130644'],
        Description: "Single MountainDew Operator Codes",
        DBtable: Index.WeaponsXPUSA,
        Game: listingType.COD,
        Subject: "✅Here's your Mountain Dew Operator Skin XP Bundle!",
        Instructions: "Redeem at mtndewgaming.com"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275619130644','285134564919'],
        Description: "Single MountainDew Operator Codes",
        DBtable: Index.WeaponsXPUSA,
        Game: listingType.COD,
        Subject: "✅Here's your Mountain Dew Operator Skin XP Bundle!",
        Instructions: "Redeem at mtndewgaming.com"
    },
    {
        quantityMultiplier: 1,
        Game: listingType.COD,
        Type: "Bundle",
        Description: "The default listing for this account",
        legacyItemID: ['275619146085'], //Array of all items
        bundleCodes: [
            {
                DBtable: Index.codes,
                quantityMultiplier: 1,
            },
            {
                DBtable: Index.Jacklinks,
                quantityMultiplier: 4,
            }
        ],

        Subject: "✅Here is your 4x Jacklinks &amp; BurgerTown Bundle!",
        Instructions: "The first code is Burger town. Redeem at https://callofduty.com/bkredeem" +
            "\n The rest are JackLink Codes redeem at https://callofduty.com/jacklinks"

    },
    {
        quantityMultiplier: 1,
        Game: listingType.COD,
        Type: "Bundle",
        Description: "Mtn Dew/JackLinks/BurgerTown",
        legacyItemID: ['275668669735'], //Array of all items
        bundleCodes: [
            {
                DBtable: Index.codes,
                quantityMultiplier: 1,
            },
            {
                DBtable: Index.WeaponsXPUSA,
                quantityMultiplier: 1,
            },
            {
                DBtable: Index.Jacklinks,
                quantityMultiplier: 4,
            },


        ],

        Subject: "✅Here is your 4x Jacklinks &amp; BurgerTown &amp; Mtn Dew Bundle!",
        Instructions: "The first code is Burger town. Redeem at https://callofduty.com/bkredeem" +
            "\n The next code is Mtn redeem at https://mtndewgaming.com\n The rest are JackLink Codes redeem at https://callofduty.com/jacklinks"
    },
    {
        quantityMultiplier: 4,
        Game:listingType.COD,
        legacyItemID: ['275643639009', '285123168830'],
        Description: "Canada WeaponsXP 30MINS",
        DBtable: Index.WeaponsXPCAD,
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
