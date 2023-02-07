import AWS from 'aws-sdk'

//AWS.config.update({region: 'us-east-1'});


async function fetchcodes (quantity,buyername,index){
    console.log("The index is" + index);
    console.log("the quantity is" + quantity);
    const documentClient = new AWS.DynamoDB.DocumentClient({
        region: 'us-east-1'
    });

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

    const Default_index = "new"


    params.Limit = quantity;
    index = index === "codes"? Default_index : `${index}-new`
    params.ExpressionAttributeValues[":value"] = index;
    console.log(params.ExpressionAttributeValues[":value"])

    const result = await documentClient.query(params).promise();

    // Update the codes consumed
    let codes = [];
    let links = [];
    for (const obj of result.Items){
        updateCodesConsumed(obj.code, buyername, index).catch((e) => {
            throw `${obj.code} could not be marked as consumed. Something went wrong`
        })
        console.log(obj.code);
        codes.push(obj.code);
        if (obj.link) {
            console.log("Object isn't undefined");
            links.push(obj.link);

            //Update the ACL on that object as well
            console.log("any object" + obj.link)
            //dynamodb returns {link: x, status: consumed/available, codeitself: DHDXXX-XXX-XXX}
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
    let s3 = new AWS.S3({
        region: 'us-east-1'
    });

    s3.putObjectAcl(params).promise().catch((e) => {
        console.log(e)
    })
}

let updateCodesConsumed = async function (primaryKey,buyername,tablename){
    console.log("Is this even running?");
    const value = tablename === "codes"? "consumed" : `${tablename}-consumed`
    const documentClient = new AWS.DynamoDB.DocumentClient({
        region: 'us-east-1'
    });
    let updateParams = {
        TableName: "codes",
        Key: { code: primaryKey},
        // Key: "code",
        UpdateExpression: 'set #status = :value, #user = :user',
        ExpressionAttributeNames: {'#status' : 'status', '#user' : 'user'},
        ExpressionAttributeValues: {
            ':value' : value, //
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
    if(!ddb) var ddb = new AWS.DynamoDB({
        apiVersion: '2012-08-10',
        region: 'us-east-1'
    });
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

function delay(t, v=null) {
    return new Promise(resolve => setTimeout(resolve, t, v));
}




export {recordTransaction,fetchcodes, delay};
