var AWS = require('aws-sdk');
const {setIntervalAsync} = require("set-interval-async");
AWS.config.update({region: 'us-east-1'});

async function fetchcodes (quantity,buyername){
    const documentClient = new AWS.DynamoDB.DocumentClient();
    params.Limit = quantity;

    const result = await documentClient.query(params).promise();

    // Update the codes consumed
    let codes = [];
    for (const obj of result.Items){
        updateCodesConsumed(obj.code, buyername).catch((e) => {
            throw `${obj.code} could not be marked as consumed. Something went wrong`
        })
        console.log(obj.code);
        codes.push(obj.code);
    }

    return codes;
}

let updateCodesConsumed = async function (primaryKey,buyername){
    const documentClient = new AWS.DynamoDB.DocumentClient();
    let updateParams = {
        TableName: 'codes',
        Key: { code: primaryKey},
        // Key: "code",
        UpdateExpression: 'set #status = :value, #user = :user',
        ExpressionAttributeNames: {'#status' : 'status', '#user' : 'user'},
        ExpressionAttributeValues: {
            ':value' : "consumed",
            ':user' : buyername
        }
    };

    console.log(updateParams);
    return documentClient.update(updateParams).promise().catch((e) => {
        console.log(e);
        throw e
    });
}

const params = {
    TableName: "codes",
//    "ScanIndexForward": true,
    IndexName: "status-code-index",
    KeyConditionExpression : '#status = :value',
    ExpressionAttributeNames: {
        "#status": "status"
    },
    ExpressionAttributeValues: {
        ":value": "available"
    },
    Limit: 1
};



async function recordTransaction(orderid,url,username,address){
    if(!ddb) var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    var params = {
        TableName: 'orders',
        Item: {
          'orderid' : {S: orderid},
          'username' : {S: username},
          'imageurl': {S: url},
          'date': { S: new Date().toString()},
          'address': {S: JSON.stringify(address)}
        }
    }
    
   return  ddb.putItem(params).promise().catch(e => {
       console.log(e);
       throw e;
   })
}

(async () => {

    // let result = await fetchcodes(4,"hater");
    // console.log(result)


})();





exports.recordTransaction = recordTransaction
exports.fetchcodes = fetchcodes