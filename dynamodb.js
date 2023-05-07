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
function fetchcodes(quantity, buyername, index) {
    return __awaiter(this, void 0, void 0, function () {
        var documentClient, params, Default_index, result, codes, links, _loop_1, _i, _a, obj;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("The index is" + index);
                    console.log("the quantity is" + quantity);
                    documentClient = new AWS.DynamoDB.DocumentClient({
                        region: 'us-east-1'
                    });
                    params = {
                        TableName: "codes",
                        //    "ScanIndexForward": true,
                        IndexName: "status-code-index",
                        KeyConditionExpression: '#status = :value',
                        ExpressionAttributeNames: {
                            "#status": "status"
                        },
                        ExpressionAttributeValues: {
                            ":value": "available"
                        },
                        Limit: 1
                    };
                    Default_index = "new";
                    params.Limit = quantity;
                    index = index === "codes" ? Default_index : "".concat(index, "-new");
                    params.ExpressionAttributeValues[":value"] = index;
                    console.log(params.ExpressionAttributeValues[":value"]);
                    return [4 /*yield*/, documentClient.query(params).promise()];
                case 1:
                    result = _b.sent();
                    codes = [];
                    links = [];
                    _loop_1 = function (obj) {
                        updateCodesConsumed(obj.code, buyername, index).catch(function (e) {
                            throw "".concat(obj.code, " could not be marked as consumed. Something went wrong");
                        });
                        console.log(obj.code);
                        codes.push(obj.code);
                        if (obj.link) {
                            console.log("Object isn't undefined");
                            links.push(obj.link);
                            //Update the ACL on that object as well
                            console.log("any object" + obj.link);
                            //dynamodb returns {link: x, status: consumed/available, codeitself: DHDXXX-XXX-XXX}
                            publicACL(obj.link.split('/').pop());
                        }
                    };
                    for (_i = 0, _a = result.Items; _i < _a.length; _i++) {
                        obj = _a[_i];
                        _loop_1(obj);
                    }
                    return [2 /*return*/, { codes: codes, links: links }];
            }
        });
    });
}
function publicACL(key) {
    return __awaiter(this, void 0, void 0, function () {
        var params, s3;
        return __generator(this, function (_a) {
            params = {
                Bucket: 'mw2-codes-new',
                Key: key,
                ACL: "public-read"
            };
            s3 = new AWS.S3({
                region: 'us-east-1'
            });
            s3.putObjectAcl(params).promise().catch(function (e) {
                console.log(e);
            });
            return [2 /*return*/];
        });
    });
}
var updateCodesConsumed = function (primaryKey, buyername, tablename) {
    return __awaiter(this, void 0, void 0, function () {
        var value, documentClient, updateParams;
        return __generator(this, function (_a) {
            console.log("Is this even running?");
            value = tablename === "codes" ? "consumed" : "".concat(tablename, "-consumed");
            documentClient = new AWS.DynamoDB.DocumentClient({
                region: 'us-east-1'
            });
            updateParams = {
                TableName: "codes",
                Key: { code: primaryKey },
                // Key: "code",
                UpdateExpression: 'set #status = :value, #user = :user',
                ExpressionAttributeNames: { '#status': 'status', '#user': 'user' },
                ExpressionAttributeValues: {
                    ':value': value,
                    ':user': buyername
                }
            };
            console.log(updateParams);
            return [2 /*return*/, documentClient.update(updateParams).promise().catch(function (e) {
                    console.log(e);
                    throw e;
                })];
        });
    });
};
function recordTransaction(orderid, url, username, address) {
    return __awaiter(this, void 0, void 0, function () {
        var ddb, params;
        return __generator(this, function (_a) {
            if (!ddb)
                ddb = new AWS.DynamoDB({
                    apiVersion: '2012-08-10',
                    region: 'us-east-1'
                });
            params = {
                TableName: 'orders',
                Item: {
                    'orderid': { S: orderid },
                    'username': { S: username },
                    'date': { S: new Date().toString() },
                    'address': { S: JSON.stringify(address) }
                }
            };
            return [2 /*return*/, ddb.putItem(params).promise().catch(function (e) {
                    console.log(e);
                    throw e;
                })];
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); })();
function delay(t, v) {
    if (v === void 0) { v = null; }
    return new Promise(function (resolve) { return setTimeout(resolve, t, v); });
}
export { recordTransaction, fetchcodes, delay };
