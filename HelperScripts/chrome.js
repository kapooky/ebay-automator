//const puppeteer = require("puppeteer-extra")
import   puppeteer from 'puppeteer-extra'
//const pluginStealth = require("puppeteer-extra-plugin-stealth")
import  pluginStealth from 'puppeteer-extra-plugin-stealth'
puppeteer.use(pluginStealth())
//const chromeLauncher = require('chrome-launcher');
import * as chromeLauncher from 'chrome-launcher'
import axios from 'axios';
import {logPlugin} from "@babel/preset-env/lib/debug.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const chromeConfig = {
    chromePath: "/usr/bin/google-chrome-stable",
    userDataDir:"/home/tariq/.config/google-chrome/Default"
  //  chromePath: "/usr/bin/google-chrome"
};

async function initiateBrowser(){
    const browser = await puppeteer.connect({browserWSEndpoint: "ws://127.0.0.1:9222/devtools/browser/7128c3d8-326f-49c0-90f5-c384c2e6eaa4" });
    const page = await browser.newPage();
    await page.goto('https://auth.ebay.com/oauth2/authorize?client_id=DigiCode-random-PRD-b95ffe9b2-9d5b5437&redirect_uri=DigiCodes-DigiCode-random-rykcv&response_type=code&state=&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.marketing.readonly%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.marketing%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory.readonly%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account.readonly%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.fulfillment%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.finances');
    await sleep(3000);

    const token =  page.url();
    console.log(token);
    return token;
}

 (async () => {
    //...
    //const chrome = await chromeLauncher.launch(chromeConfig).catch(e => console.log(e))
     //console.log(chrome);
    //const response = await axios.get(`http://localhost:${chrome.port}/json/version`);
    //const { webSocketDebuggerUrl } = response.data;
     //console.log(response.data)
 await initiateBrowser();
 })();

//log in into google account....

module.exports