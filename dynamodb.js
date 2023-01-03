var AWS = require('aws-sdk');
const {setIntervalAsync} = require("set-interval-async");
AWS.config.update({region: 'us-east-1'});

async function fetchcodes (quantity,buyername,tablename){
    console.log("the quantity is" + quantity);
    const documentClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: "codes",
//    "ScanIndexForward": true,
        IndexName: "status-code-index",
        KeyConditionExpression : '#status = :value',
        ExpressionAttributeNames: {
            "#status": "status"
        },
        ExpressionAttributeValues: {
            ":value": "new"
        },
        Limit: 1
    };

    params.Limit = quantity;

    const result = await documentClient.query(params).promise();

    // Update the codes consumed
    let codes = [];
    let links = [];
    for (const obj of result.Items){
        updateCodesConsumed(obj.code, buyername,tablename).catch((e) => {
            throw `${obj.code} could not be marked as consumed. Something went wrong`
        })
        console.log(obj.code);
        codes.push(obj.code);
        if (typeof obj.link!== 'undefined') {
            console.log("Object isn't undefined");
            links.push(obj.link);

            //Update the ACL on that object as well
            console.log("any object" + obj.link)
            publicACL(obj.link.split('/').pop())
        }
    }
    return {codes:codes, links:links};
}

async function publicACL(key){
    let params = {
        Bucket: 'mw2-codes-new', /* required */
        Key: key, /* required */
        ACL: "public-read"
    }
    let s3 = new AWS.S3();

    s3.putObjectAcl(params).promise().catch((e) => {
        console.log(e)
    })
}

let updateCodesConsumed = async function (primaryKey,buyername,tablename="codes"){
    const documentClient = new AWS.DynamoDB.DocumentClient();
    let updateParams = {
        TableName: tablename,
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




async function recordTransaction(orderid,url,username,address){
    if(!ddb) var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    var params = {
        TableName: 'orders',
        Item: {
          'orderid' : {S: orderid},
          'username' : {S: username},
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