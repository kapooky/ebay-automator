const fs = require('fs')
const {parse} = require('csv-parse/sync');
const AWS = require('aws-sdk')
//Remove some codes from
AWS.config.update({region: 'us-east-1'});
const docClient = new AWS.DynamoDB.DocumentClient()

const contents = fs.readFileSync('codes.csv', 'utf-8')
// If you made an export of a DynamoDB table you need to remove (S) etc from header
const data = parse(contents, {columns: true})



data.forEach((item) => {
    if(!item.maybeempty) delete item.maybeempty //need to remove empty items
    item.date = new Date().toString();
    console.log(item.code);
    docClient.delete({TableName: 'codes',  Key: {
            code: item.code,
        }}, (err, res) => {
        if(err) console.log(err);
        console.log(res);
    })
})