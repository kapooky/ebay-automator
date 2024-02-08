var AWS = require('aws-sdk');
const {setIntervalAsync} = require("set-interval-async");
AWS.config.update({region: 'us-east-1'});
var s3 = new AWS.S3();


//const usernames = ["kapooky102","mw2codesforyou", "kapooky12","kapooky100","thunder_bandit_shop_codes"];
const usernames = ["tybr-335"];

const updateParams = {
    TableName: "codes",
//    "ScanIndexForward": true,
    IndexName: "user-code-index",
    //FilterExpression : "contains(#name, :name)",
    KeyConditionExpression : '#user = :value',
    ExpressionAttributeNames: {
        "#user": "user"
    },
    ExpressionAttributeValues: {
        ":value": "placeholder"
    },
};

async function query(username) {
    updateParams.ExpressionAttributeValues[":value"] = username
    const documentClient = new AWS.DynamoDB.DocumentClient();
    console.log(updateParams);
    return documentClient.query(updateParams).promise().catch((e) => {
        console.log(e);
        throw e
    });
}
async function putACL(url){
    if(!url) return;
    let keyname = url.split('/').pop();
    let params = {
        Bucket: 'mw2-codes-new', /* required */
        Key: keyname, /* required */
        ACL: "authenticated-read"
    }
    let result = await s3.putObjectAcl(params).promise();
    console.log("The result is: ")
    console.log(result);
}

( async () => {

    try {
        for (const username of usernames) {
            let result = await query(username);
            let promises = []
            for (const item of result.Items) {
              //  console.log(item)
               promises.push(updateCodesConsumed(item));
               if(item.link) promises.push(putACL(item.link));

            }
            console.log(result);
            await Promise.all(promises).then(result => {
                console.log(result);
                console.log("Everything is complete")
            })
        }
    }
    catch (e){
        console.log(e);
        throw e;
    }

})();


let updateCodesConsumed = async function (item){
    const documentClient = new AWS.DynamoDB.DocumentClient();

    //const newStatus = `${item.status.split('-')[0]}-new`;
    const newStatus = "new"
  //  const newStatus = item.status.split('-').length > 1 ? `${item.status.split('-')[0]}-new` : `new`;
    let updateParams = {
        TableName: 'codes',
        Key: { code: item.code},
        // Key: "code",
        UpdateExpression: 'set #status = :value, #user = :user',
        ExpressionAttributeNames: {'#status' : 'status', '#user' : 'user'},
        ExpressionAttributeValues: {
            ':value' : newStatus,
            ':user' : "null"
        }
    };

    console.log(updateParams);
    return documentClient.update(updateParams).promise().catch((e) => {
        console.log(e);
        throw e
    });
}
