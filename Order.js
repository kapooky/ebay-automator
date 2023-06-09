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
import AWS from 'aws-sdk';
//AWS.config.update({region: 'us-east-1'});
import { Game, Index, ListingType } from './d.js';
import { delay, fetchcodes, recordTransaction } from "./dynamodb.js";
var DEFAULT_LISTING = {
    quantityMultiplier: 1,
    Description: "The default listing for this account",
    legacyItemID: ['275586756168'],
    DBtable: Index.DEFAULT,
    Game: Game.COD,
    ListingType: ListingType.CODE,
    Subject: "Please contact me",
    Instructions: "Hello, please contact me to receive your item. I should reply back within the same day.Thank you!"
};
var Order = /** @class */ (function () {
    function Order(account, e) {
        this.account = account;
        this.e = e;
        this.ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10',
            region: 'us-east-1'
        });
        this.DEFAULT_LISTING = DEFAULT_LISTING;
        // this.handleOrder(e);
    }
    Order.prototype.determineListings = function (e) {
        console.log(this.account.listings);
        console.log(e.lineItems);
        //Check which Listing
        var foundListing;
        for (var _i = 0, _a = this.account.listings; _i < _a.length; _i++) {
            var listing = _a[_i];
            if (listing.legacyItemID.find(function (item) { return item === e.lineItems[0].legacyItemId; })) {
                foundListing = listing;
                break;
            }
        }
        if (foundListing) {
            console.log("Found listing", foundListing);
            return foundListing;
        }
        console.log("did not find listing");
        return DEFAULT_LISTING;
    };
    Order.prototype.handleBundle = function (quantity, listing, buyername) {
        return __awaiter(this, void 0, void 0, function () {
            var codes, links, _i, _a, bundleItem, obj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        codes = [];
                        links = [];
                        console.log("listing" + JSON.stringify(listing));
                        _i = 0, _a = listing.bundleCodes;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        bundleItem = _a[_i];
                        return [4 /*yield*/, fetchcodes(quantity * bundleItem.quantityMultiplier, buyername, bundleItem.DBtable)];
                    case 2:
                        obj = _b.sent();
                        codes = codes.concat(obj.codes);
                        links = links.concat(obj.links);
                        console.log("obj" + JSON.stringify(obj));
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log("The final array is" + JSON.stringify({ codes: codes, links: links }));
                        return [2 /*return*/, { codes: codes, links: links }];
                }
            });
        });
    };
    Order.prototype.handleOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var listing, count, buyername, address, _a, codes, links, _b, messageObject, messageResult, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        listing = this.determineListings(order);
                        count = order.lineItems[0].quantity * listing.quantityMultiplier;
                        //   if(listing.DBtable === Index.TwoHOUR_WEAPONS_XP) count = Math.ceil(count/2); //RATE LIMIT
                        if (listing.hasOwnProperty('limit') && count > listing.limit)
                            count = listing.limit;
                        console.log("the Quantity is " + count);
                        buyername = order.buyer.username;
                        address = order.buyer.taxAddress;
                        if (!(listing.ListingType === ListingType.BUNDLE)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.handleBundle(count, listing, buyername)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, fetchcodes(count, buyername, listing.DBtable)];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        _a = _b, codes = _a.codes, links = _a.links;
                        console.log(codes);
                        messageObject = {
                            buyername: buyername,
                            id: order.lineItems[0].legacyItemId,
                            s3links: codes,
                            links: links
                        };
                        console.log(messageObject);
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 11, , 12]);
                        return [4 /*yield*/, recordTransaction(order.legacyOrderId.toString(), codes.toString(), buyername, address)];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, this.sendOrderMessage(messageObject, listing).catch(function (e) {
                                console.log(e);
                                throw e;
                            })];
                    case 7:
                        messageResult = _c.sent();
                        return [4 /*yield*/, this.markasShipped(order)];
                    case 8:
                        _c.sent();
                        return [4 /*yield*/, delay(60000)];
                    case 9:
                        _c.sent();
                        return [4 /*yield*/, this.sendGoodbyeMessage(messageObject, listing).catch(function (e) {
                                console.log(e);
                                throw e;
                            })];
                    case 10:
                        _c.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_1 = _c.sent();
                        console.log(e_1);
                        throw e_1;
                    case 12:
                        console.log("RESULT FINISHED");
                        return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.markasShipped = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.account.api.sell.fulfillment.createShippingFulfillment(order.legacyOrderId, {
                            lineItems: [
                                {
                                    lineItemId: order.lineItems[0].lineItemId,
                                    quantity: order.lineItems[0].quantity
                                }
                            ]
                        }).catch(function (e) {
                            console.log(e);
                            throw e;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.sendOrderMessage = function (obj, listing) {
        return __awaiter(this, void 0, void 0, function () {
            var body, i, myString, username, link, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.account.api);
                        body = "Here are the codes, I typed them up: \n";
                        if (listing.ListingType === ListingType.TWITCHDROP) {
                            body = "Here are the credentials for the Twitch Account: \n";
                        }
                        for (i = 0; i < obj.s3links.length; i++) {
                            myString = obj.s3links[i].toString();
                            if (listing.ListingType === ListingType.TWITCHDROP) {
                                username = myString.substring(0, myString.indexOf(':'));
                                link = myString.substring(myString.indexOf(':') + 1);
                                body = "Please watch the video: https://streamable.com/9021a9 \n \uD83D\uDC49 Login: ".concat(username, " \n \uD83D\uDC49 Password: YouAreAwesomeYesYou123452!@# \n \uD83D\uDC49 Email Verification: https://www.1secmail.com/?login=").concat(username, "&amp;domain=qiott.com \n");
                            }
                            else {
                                body += "".concat(i + 1, ". ").concat(obj.s3links[i].toString().replace(/-/g, "-"));
                            }
                            //body += `${i+1}. ${obj.s3links[i].toString()}`;
                            body += "\n";
                        }
                        body += listing.Instructions;
                        body += "\n Thank you for your purchase! And I hope I get to see you again!";
                        if (obj.links.length > 0) { //todo This will be invoked even if obj.links == 0
                            body += '\n\n P.S: Are you getting an error? There could be a typo in the code.';
                            body += "\n" + "please double check the code from the image link(s) below👇" + "\n";
                            obj.links.map(function (link, index) {
                                var count = index + 1;
                                body += "".concat(count, ". ").concat(link, "\n");
                            });
                        }
                        console.log(body);
                        return [4 /*yield*/, this.account.api.trading.AddMemberMessageAAQToPartner({
                                ItemID: obj.id,
                                MemberMessage: {
                                    Body: body.toString(),
                                    QuestionType: "CustomizedSubject",
                                    Subject: listing.Subject,
                                    RecipientID: obj.buyername
                                },
                            }).catch(function (e) {
                                console.log(e);
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.sendGoodbyeMessage = function (obj, listing) {
        return __awaiter(this, void 0, void 0, function () {
            var message, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = "Enjoy your rewards! Please have a look at my other ads!\n Kind Regards, John";
                        if (listing.Game === Game.HALO) {
                            message = "Check out my other Halo listings!  https://www.ebay.com/str/digitalgoodsstor3/Halo/_i.html?store_cat=39944678018 \n John";
                        }
                        return [4 /*yield*/, this.account.api.trading.AddMemberMessageAAQToPartner({
                                ItemID: obj.id,
                                MemberMessage: {
                                    Body: message,
                                    QuestionType: "CustomizedSubject",
                                    Subject: "Hope everything went well",
                                    RecipientID: obj.buyername
                                },
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Order;
}());
export default Order;
