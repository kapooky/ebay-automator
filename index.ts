import {Game, Index, Listing, ListingType} from "./d.js";
import Account from "./Account.js";

import {createRequire} from "module";

const require = createRequire(import.meta.url);

const tokenobject = require("./data.json");
const kapooky102object = require("./kapooky102.json");
const daniellaobject = require("./data-daniella.json");
const tariqazmatdotdevObject = require("./data-tariqazmatdev.json");

let listings: Listing[] = [{
    quantityMultiplier: 5,
    legacyItemID: ['275602449522', '275621619754', '225361736511', '285119694121', '275641135685', '314358285350','225411875654','225444235394','275749784299'],
    Description: "5-Hour code",
    DBtable: Index.codes,
    Game: Game.COD,
    ListingType: ListingType.CODE,
    Subject: "✅Here's your 5-hour XP codes!",
    Instructions: "Redeem at https://callofduty.com/bkredeem"
},
    {
        quantityMultiplier: 10,
        legacyItemID: ['275619118081', '275621234088', '275621979129', '225361664908', '275632894735', '285108201011', '314335765331','275674532735','275714610570','275838234544'],
        Description: "10-Hour code",
        DBtable: Index.codes,
        Game: Game.COD,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your 10-hour XP codes!",
        Instructions: "Redeem at https://callofduty.com/bkredeem"

    },

    {
        quantityMultiplier: 16,
        legacyItemID: ['276161448603'],
        Description: "16-Hour code",
        DBtable: Index.codes,
        Game: Game.COD,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your 16-hour XP codes!",
        Instructions: " ➡️ Redeem at https://callofduty.com/bkredeem \n\n Please give me some time to respond if you need help. \n \n ⚠️ You can only redeem a maximum of 40 codes per account!"

    },
    {
        quantityMultiplier: 2,
        legacyItemID: ['275743365685','275823515927','225583781920','314952694726', '225576334925','314952694726'],
        Description: "2-hour BK COdes",
        DBtable: Index.codes,
        Game: Game.COD,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your 2-hour 2XP codes!",
        Instructions: "Redeem at https://callofduty.com/bkredeem"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['314962894251'],
        Description: "1-hour BK COdes",
        DBtable: Index.codes,
        Game: Game.COD,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your Burger King operator Skin",
        Instructions: "Redeem at https://callofduty.com/bkredeem"
    },
    {
        quantityMultiplier: 4,
        legacyItemID: ['276157292677','314952323545'],
        Description: "4-hour BK MW3 Codes",
        DBtable: Index.codes,
        Game: Game.COD,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your 4-hour 2XP codes!",
        Instructions: " ➡️ Redeem at https://callofduty.com/bkredeem \n\n Please give me some time to respond if you need help. \n \n ⚠️ You can only redeem a maximum of 40 codes per account!"
    },
    {
        quantityMultiplier: 32,
        legacyItemID: ['314962872061'],
        Description: "32 -hour BK MW3 Codes",
        DBtable: Index.codes,
        Game: Game.COD,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your 32 -hour 2XP codes!",
        Instructions: " ➡️ Redeem at https://callofduty.com/bkredeem \n\n Please give me some time to respond if you need help. \n \n ⚠️ You can only redeem a maximum of 40 codes per account!"
    },
    {
        quantityMultiplier: 40,
        legacyItemID: ['314962872061'],
        Description: "40 -hour BK MW3 Codes",
        DBtable: Index.codes,
        Game: Game.COD,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your 40 -hour 2XP codes!",
        Instructions: " ➡️ Redeem at https://callofduty.com/bkredeem \n\n Please give me some time to respond if you need help. \n \n ⚠️ You can only redeem a maximum of 40 codes per account!"
    },

    {
        quantityMultiplier: 8,
        legacyItemID: ['276164499085'],
        Description: "8-hour BK MW3 Codes",
        DBtable: Index.codes,
        Game: Game.COD,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your 8-hour 2XP codes!",
        Instructions: " ➡️ Redeem at https://callofduty.com/bkredeem \n\n Please give me some time to respond if you need help. \n \n ⚠️ You can only redeem a maximum of 40 codes per account!"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['225471847770'],
        Description: "jacklinks 1 code only",
        DBtable: Index.Jacklinks,
        Game: Game.COD,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your JackLinks Code!",
        Instructions: "Redeem at https://callofduty.com/jacklinks"
    },
    {
        quantityMultiplier: 4,
        legacyItemID: ['314574534504','314574532072','314574533332','275827527324','225583764490','225583759221','275860367275','275860630558','275860367275','275860708243','314627036499'],
        Description: "jacklinks 4 codes only",
        DBtable: Index.Jacklinks,
        Game: Game.COD,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your JackLinks Code!",
        Instructions: "Redeem at https://callofduty.com/jacklinks"
    },
    {
        quantityMultiplier: 3,
        legacyItemID: ['275742640762','275637402113','314395676218','275818243173'],
        Description: "WEAPONS XP",
        DBtable: Index.WeaponsXPUSA,
        Game: Game.COD,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your Weapons XP Bundle!",
        Instructions: "Hey! I've sent the first 3 hours, I just need your confirmation that everything worked and I'll send the rest :) Redeem at mtndewgaming.com"
    },

    {
        quantityMultiplier: 1,
        legacyItemID: ['225554401409','314393707703','275693756654'],
        Description: "COD TWITCH DROPS",
        DBtable: Index.SUNDAYCDL,
        ListingType: ListingType.TWITCHDROP, //TODO CHANGE THIS
        Game: Game.COD,
        Subject: "✅Here is your Sunday CDL Twitch Drop",
        Instructions: "Please watch the video linked above to redeem the drops"
    },

    {
        quantityMultiplier: 1,
        legacyItemID: ['314620787321'],
        Description: "COD TWITCH DROPS ",
        DBtable: Index.FULLCOD,
        ListingType: ListingType.TWITCHDROP, //TODO CHANGE THIS
        Game: Game.COD,
        Subject: "✅Here is your Sunday CDL Twitch Drop",
        Instructions: "Please watch the video linked above to redeem the drops. If you don't see the account credentials in this message, then please contact me. https://www.ebay.com/usr/mw2codesforyou"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['314610877180'],
        Description: "COD Endowment",
        DBtable: Index.ENDOWMENT,
        ListingType: ListingType.CODE, //TODO CHANGE THIS
        Game: Game.COD,
        Subject: "✅Here is your Endowment Pack",
        Instructions: "Please give us 1-2 hours for us to process your order. Instructions "
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275838665889','225569860700'],
        Description: "HALO MILK  TWITCH DROPS",
        DBtable: Index.MILK,
        ListingType: ListingType.TWITCHDROP, //TODO CHANGE THIS
        Game: Game.HALO,
        Subject: "✅Here is your Halo GOT MILK Twitch Drop",
        Instructions: "Please watch the video linked above to redeem the drops"
    },

    {
        quantityMultiplier: 1,
        legacyItemID: ['275862484898'],
        Description: "HALO TWITCH DROP PACK",
        DBtable: Index.FULLHALO,
        ListingType: ListingType.TWITCHDROP, //TODO CHANGE THIS
        Game: Game.HALO,
        Subject: "✅Here is your Halo Twitch Drop Pack!",
        Instructions: "Please watch the video linked above to redeem the drops"
    },


    {
        quantityMultiplier: 1,
        legacyItemID: ['275837105333','275838144781','225576335528'],
        Description: "HOGWARTS MAY TWITCH DROPS",
        DBtable: Index.HOGWARTS,
        ListingType: ListingType.TWITCHDROP, //TODO CHANGE THIS
        Game: Game.HARRYPOTTER,
        Subject: "✅Here is your Twitch DROP",
        Instructions: "Redeem the twitch drop by following the instructions!"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275663681858'],
        Description: "Sea Of Thieves",
        DBtable: Index.Sea_Of_Thieves,
        Game: Game.OTHER,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your Sea of Thieves Steam Key!",
        Instructions: "Redeem on the Steam APP!"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275826948628','2791959008012'],
        Description: "JEDI SKIN",
        DBtable: Index.JEDI,
        Game: Game.OTHER,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your JEDI Origin key Key!",
        Instructions: "Redeem on Origin APP!"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275819843703','314561592888','225569865961'],
        Description: "Keepy Uppy Twitch Drop",
        DBtable: Index.KEEPY_UPPY,
        Game: Game.OTHER,
        ListingType: ListingType.TWITCHDROP,
        Subject: "✅Here's your Keepy Uppy Twitch Drop!",
        Instructions: "Go to Twitch.tv"

    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['314585438096'],
        Description: "Warcraft",
        DBtable: Index.WARCRAFT,
        Game: Game.OTHER,
        ListingType: ListingType.TWITCHDROP,
        Subject: "✅Here's your WoW Twitch Drop!",
        Instructions: "Go to Twitch.tv to redeem also please note it may take 24 hours for the rewards to be in your account."

    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275825414197','225556339788'],
        Description: "Midnight Gold Twitch Drop",
        DBtable: Index.MIDNIGHT,
        Game: Game.HALO,
        ListingType: ListingType.TWITCHDROP,
        Subject: "✅Here's your Midnight Gold Twitch Account!",
        Instructions: "Go to Twitch.tv to redeem!"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275849189392'],
        Description: "SweepCharm Twitch Drop",
        DBtable: Index.SWEEP,
        Game: Game.HALO,
        ListingType: ListingType.TWITCHDROP,
        Subject: "✅Here's your SweepCharm DROP Twitch Account!",
        Instructions: "Go to Twitch.tv to redeem!"
    },
    {
        quantityMultiplier: 2,
        legacyItemID: ['276139750021'],
        Description: "Ebay Little Caeser Operator",
        DBtable: Index.CAESER,
        Game: Game.COD,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your little Caeser code!",
        Instructions: "Go to https://callofduty.littlecaesars.com/ to redeem!"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275826975169'],
        Description: "Victory Shout Pose Twitch Drop",
        DBtable: Index.VICTORYSHOUT,
        Game: Game.HALO,
        ListingType: ListingType.TWITCHDROP,
        Subject: "✅Here's your Victory Shout Pose Twitch Account!",
        Instructions: "Go to Twitch.tv to redeem!"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['314585458027'],
        Description: "Halo Arbitration Twitch Drop",
        DBtable: Index.EMBLEM,
        Game: Game.HALO,
        ListingType: ListingType.TWITCHDROP,
        Subject: "✅Here's your Emblem Twitch Account!",
        Instructions: "Go to Twitch.tv to redeem!"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['225601211222'],
        Description: "Death Hex Bull Dog twitch Drop",
        DBtable: Index.DEATHHEX,
        Game: Game.HALO,
        ListingType: ListingType.TWITCHDROP,
        Subject: "✅Here's your DeathHex Twitch Account!",
        Instructions: "Go to Twitch.tv to redeem!"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275838642560'],
        Description: "Celebration Stance  twitch Drop",
        DBtable: Index.STANCE,
        Game: Game.HALO,
        ListingType: ListingType.TWITCHDROP,
        Subject: "✅Here's your HCS Celebration Stance Account!",
        Instructions: "Go to Twitch.tv to redeem!"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275887058714','225605079994'],
        Description: "EMBER HEX Twitch Drop",
        DBtable: Index.WARCRAFT,
        Game: Game.HALO,
        ListingType: ListingType.TWITCHDROP,
        Subject: "✅Here's your EMBER HEX Account!",
        Instructions: "Go to Twitch.tv or https://www.halowaypoint.com/redeem to redeem!"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['314372690234', '275663879112','314372690234','225411868211','314452531906','314452531906','314555265591'],
        Description: "Halo Oreo",
        DBtable: Index.Halo_Oreo,
        Game: Game.HALO,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your Halo Oreo Key!",
        Instructions: "Go to Halowaypoint.com/redeem"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275740717192'],
        Description: "XBOX 1 MONTH",
        DBtable: Index.XBOX1MONTH,
        Game: Game.XBOX,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your XBOX 1-MONTH Key!",
        Instructions: "Go to https://redeem.microsoft.com"
    },
    {
        quantityMultiplier: 2,
        legacyItemID: ['275720427322'],
        Description: "Halo BOGO",
        DBtable: Index.Halo_Oreo,
        Game: Game.HALO,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your Halo Oreo Key!",
        Instructions: "Here is your code along with your FREE bonus code! Go to Halowaypoint.com/redeem"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275671057323'],
        Description: "Roblox 100",
        DBtable: Index.Roblox100,
        ListingType: ListingType.CODE,
        Game: Game.ROBLOX,
        Subject: "✅Here's your Roblox 100 Key!",
        Instructions: "Go to www.roblox.com/redeem"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275666669227'],
        Description: "Halo SPNKR",
        DBtable: Index.Halo_spnkr,
        Game: Game.HALO,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your Halo SPNKR Key!",
        Instructions: "Go to Halowaypoint.com/redeem"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275666523155'],
        Description: "Halo Hydra",
        DBtable: Index.Halo_hydra,
        Game: Game.HALO,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your Halo Hydra Key!",
        Instructions: "Go to Halowaypoint.com/redeem"
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275666668552'],
        Description: "Halo razerback",
        DBtable: Index.Halo_RAZERBACK,
        Game: Game.HALO,
        ListingType: ListingType.CODE,
        Subject: "✅Here's your Halo Razerback Key!",
        Instructions: "Go to Halowaypoint.com/redeem "
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['225430698729','225401894348'],
        Description: "Single MountainDew Operator Codes",
        DBtable: Index.WeaponsXPUSA,
        Game: Game.COD,
        ListingType: ListingType.CODE,

        Subject: "✅Here's your Mountain Dew Operator Skin XP",
        Instructions: "Redeem at mtndewgaming.com  You need a USA Address to sign up. Don't have one? use this site! https://usaddressgenerator.com/ "
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275772811982'],
        Description: "FIFA 23",
        DBtable: Index.FIFA23,
        Game: Game.OTHER,
        ListingType: ListingType.CODE,

        Subject: "✅Here's your FIFA 23 BONUS KEY!",
        Instructions: "Please follow the instructions in my ad: https://www.ebay.com/itm/275772811982  Need help? Watch this video: https://youtu.be/kvmYcsNtn2Y?t=66 "
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275772811982'],
        Description: "Forza Oreo",
        DBtable: Index.FORZA,
        Game: Game.OTHER,
        ListingType: ListingType.CODE,

        Subject: "✅Here's your FIFA 23 BONUS KEY!",
        Instructions: "Please follow the instructions in my ad: https://www.ebay.com/itm/275772811982  Need help? Watch this video: https://youtu.be/kvmYcsNtn2Y?t=66 "
    },
    {
        quantityMultiplier: 1,
        legacyItemID: ['275778798943'],
        Description: "HyperX COD",
        DBtable: Index.HYPERX,
        Game: Game.COD,
        ListingType: ListingType.CODE,

        Subject: "✅Here's your HyperX key!",
        Instructions: "To redeem your code visit: https://profile.callofduty.com/promotions/redeemCode"
    },
    {
        quantityMultiplier: 1,
        Game: Game.COD,
        ListingType: ListingType.BUNDLE,
        Description: "Jacklinks/Mw2",
        legacyItemID: ['314498391713','314574535597','314574536981','275720447754','314627077189','314627038970','314633905203','225607533478'], //Array of all items
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
        Game: Game.COD,
        ListingType: ListingType.BUNDLE,
        Description: "Jack Links/Burger Town",
        legacyItemID: ['275772779537','314498391713'], //Array of all items
        bundleCodes: [
            {
                DBtable: Index.codes,
                quantityMultiplier: 1,
            },
            {
                DBtable: Index.Jacklinks,
                quantityMultiplier: 4,
            },
        ],

        Subject: "✅Here is your 4x Jacklinks &amp; Burger Town Bundle!",
        Instructions: "The first code is BurgerTown. Redeem at https://callofduty.com/bkredeem" +
            "\n The rest are JackLink Codes redeem at https://callofduty.com/jacklinks"
    },
    {
        quantityMultiplier: 1,
        Game: Game.COD,
        ListingType: ListingType.BUNDLE,
        Description: "TRIPLE BUNDLE",
        legacyItemID: ['314635952881'], //Array of all items
        bundleCodes: [
            {
                DBtable: Index.codes,
                quantityMultiplier: 1,
            },
            {
                DBtable: Index.Jacklinks,
                quantityMultiplier: 4,
            },
        ],

        Subject: "✅Here is your Triple Operator Bundle!",
        Instructions: "➡️ The first code is BurgerTown. Redeem at https://callofduty.com/bkredeem" +
            "\n ➡️ The rest are JackLink Codes redeem at https://callofduty.com/jacklinks" +
            "\n \n ⚠️ For the Valkeryie Operator, please tell me your platform(XBOX/PSN/Battle/STEAM) and location(NA/EU/ASIA)"
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
