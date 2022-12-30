var AWS = require('aws-sdk');
const {setIntervalAsync} = require("set-interval-async");
AWS.config.update({region: 'us-east-1'});

const usernames = ["kapooky100", "kapooky","kapooky100"];

const updateParams = {
    TableName: "codes",
//    "ScanIndexForward": true,
    IndexName: "user-code-index",
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

( async () => {

    try {
        for (const username of usernames) {
            let result = await query(username);
            let promises = []
            for (const item of result.Items) {
                promises.push(updateCodesConsumed(item.code));
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


let updateCodesConsumed = async function (primaryKey){
    const documentClient = new AWS.DynamoDB.DocumentClient();
    let updateParams = {
        TableName: 'codes',
        Key: { code: primaryKey},
        // Key: "code",
        UpdateExpression: 'set #status = :value, #user = :user',
        ExpressionAttributeNames: {'#status' : 'status', '#user' : 'user'},
        ExpressionAttributeValues: {
            ':value' : "available",
            ':user' : "null"
        }
    };

    console.log(updateParams);
    return documentClient.update(updateParams).promise().catch((e) => {
        console.log(e);
        throw e
    });
}
