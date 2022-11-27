var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});


async function recordTransaction(orderid,url,username){
    if(!ddb) var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    var params = {
        TableName: 'orders',
        Item: {
          'orderid' : {S: orderid},
          'username' : {S: username},
          'imageurl': {S: url}
        }
    }
    
   return  ddb.putItem(params).promise().catch(e => {
       console.log(e);
       throw e;
   })

}

module.exports = recordTransaction