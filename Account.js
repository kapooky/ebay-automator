'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import ebay from 'ebay-api';
import Order from './Order.js';
import AWS from 'aws-sdk';
import { setIntervalAsync } from 'set-interval-async';
import puppeteer from 'puppeteer-extra';
//const pluginStealth = require("puppeteer-extra-plugin-stealth")
import pluginStealth from 'puppeteer-extra-plugin-stealth';
import querystring from "querystring";
import fs from "fs";
//AWS.config.update({region: 'us-east-1'});
var Account = /** @class */ (function () {
    function Account(listings, name, credentials) {
        var _this = this;
        var OBJECT = {
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
        };
        this.listings = listings;
        this.ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10',
            region: 'us-east-1'
        });
        this.name = name;
        this.api = new ebay(OBJECT);
        this.api.OAuth2.setCredentials(credentials);
        //console.log(this.api)
        // this.api.sell.fulfillment.getOrders().then(x => {
        //     console.log(x)
        // }).catch(e => {
        //     console.log(e);
        // })
        this.api.OAuth2.on('refreshAuthToken', function (token) {
            credentials.access_token = token.access_token;
            credentials.expires_in = token.expires_in;
            credentials.refresh_token = token.refresh_token;
            credentials.refresh_token_expires_in = token.refresh_token_expires_in;
            credentials.token_type = token.token_type;
            credentials.date = Date().toString();
        });
        //    console.log("we're working working");
        setTimeout(function () {
            _this.setIntervalAsync();
        }, 15000);
    }
    Account.prototype.sendAlert = function (message) {
        var params = {
            Message: message,
            TopicArn: 'arn:aws:sns:us-east-1:611105091336:ErrorEbay'
        };
        // Create promise and SNS service object
        var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31',
            region: 'us-east-1'
        }).publish(params).promise();
    };
    Account.prototype.addlisting = function (listing) {
        this.listings.push(listing);
        return this.listings;
    };
    Account.prototype.setIntervalAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("we're working");
                        return [4 /*yield*/, this.loop()];
                    case 1:
                        _a.sent();
                        setIntervalAsync(function () { _this.loop(); }, 8000);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.sendAlert("Interval had a Problem: ".concat(e_1));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Account.prototype.handleError = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Account.prototype.loop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ordersResult, _i, _a, e, params, check, orderObject;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("looping...".concat(this.name));
                        return [4 /*yield*/, this.api.sell.fulfillment.getOrders({
                                filter: "orderfulfillmentstatus:%7BNOT_STARTED%7CIN_PROGRESS%7D"
                            }).catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                var token, result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log("This error occured in the catchall loop function ".concat(e));
                                            if (!(e == "EBayError: invalid_client")) return [3 /*break*/, 3];
                                            console.log("Inside the loop");
                                            return [4 /*yield*/, this.initiateBrowser()];
                                        case 1:
                                            token = _a.sent();
                                            console.log("going into retrieve function");
                                            return [4 /*yield*/, this.retrieveandSaveToken(token)];
                                        case 2:
                                            result = _a.sent();
                                            _a.label = 3;
                                        case 3: return [4 /*yield*/, this.handleError(e)];
                                        case 4:
                                            _a.sent();
                                            throw e;
                                    }
                                });
                            }); })];
                    case 1:
                        ordersResult = _b.sent();
                        _i = 0, _a = ordersResult.orders;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        e = _a[_i];
                        console.log("Unshipped order in ".concat(this.name, " account from ").concat(e.buyer.username, " and title: ").concat(e.lineItems["0"].title, ", Quantity: ").concat(e.lineItems[0].quantity, " "));
                        if (!(e.orderPaymentStatus === "PAID" && e.orderFulfillmentStatus === "NOT_STARTED")) return [3 /*break*/, 4];
                        params = {
                            TableName: 'orders',
                            Key: {
                                "orderid": { S: e.legacyOrderId.toString() }
                            }
                        };
                        return [4 /*yield*/, this.ddb.getItem(params).promise().catch(function (e) { throw e; })];
                    case 3:
                        check = _b.sent();
                        //If order ID doesn't exist, add new order
                        console.log("Is there a value in dymnabodb?: " + check.item);
                        if (!check.Item) {
                            this.sendAlert("Unshipped order in ".concat(this.name, " account from ").concat(e.buyer.username, " and title: ").concat(e.lineItems["0"].title, ", Quantity: ").concat(e.lineItems[0].quantity, " "));
                            console.log("There is an Item");
                            orderObject = new Order(this, e);
                            orderObject.handleOrder(e);
                            // setTimeout(() =>{
                            //     Destr;
                            // })
                        }
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    Account.prototype.sleep = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
            });
        });
    };
    Account.prototype.initiateBrowser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var chromeConfig, browser, page, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        puppeteer.use(pluginStealth());
                        chromeConfig = {
                            chromePath: "/usr/bin/google-chrome-stable",
                            userDataDir: "/home/tariq/.config/google-chrome/Default"
                            //  chromePath: "/usr/bin/google-chrome"
                        };
                        return [4 /*yield*/, puppeteer.connect({ browserWSEndpoint: "ws://127.0.0.1:9222/devtools/browser/54c2ab7c-3e8f-45a4-ad06-168d9fd3da58" })];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        return [4 /*yield*/, page.goto('https://auth.ebay.com/oauth2/authorize?client_id=DigiCode-random-PRD-b95ffe9b2-9d5b5437&redirect_uri=DigiCodes-DigiCode-random-rykcv&response_type=code&state=&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.marketing.readonly%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.marketing%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory.readonly%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account.readonly%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.fulfillment%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.finances')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.sleep(3000)];
                    case 4:
                        _a.sent();
                        token = page.url();
                        console.log(token);
                        return [2 /*return*/, token];
                }
            });
        });
    };
    Account.prototype.retrieveandSaveToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedUrl, otherToken, value, fileName, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parsedUrl = querystring.parse(token, undefined, undefined, { decode: true }).code;
                        console.log(parsedUrl);
                        otherToken = parsedUrl;
                        if (!otherToken) return [3 /*break*/, 2];
                        console.log("trying to call the api");
                        return [4 /*yield*/, this.api.OAuth2.obtainToken(otherToken)];
                    case 1:
                        value = _a.sent();
                        console.log(value);
                        fileName = '/home/tariq/github/ebay-automator/data-tariqazmatdev.json';
                        data = value;
                        try {
                            fs.writeFileSync(fileName, JSON.stringify(data));
                            console.log("File has been saved.");
                        }
                        catch (error) {
                            console.error(error);
                        }
                        console.log(JSON.stringify(value));
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return Account;
}());
export default Account;
//# sourceMappingURL=Account.js.map