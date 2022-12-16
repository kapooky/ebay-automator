var AWS = require("aws-sdk");
var s3 = new AWS.S3();
var params = {
    Bucket: "mw2-codes-new",
};

// kapwo42
// arcticpe_78
// mw2codesforyou

users = ["mw2codesforyou","arcticpe_78", "mw2codesforyou","kapooky","kapoo-36"];
//Quick Script to delete a tag from an object
promises = [];
(async () => {
    let objects = await s3.listObjectsV2(params).promise().catch((e) => {
        console.log(e)});
    for (const object of objects.Contents) {
        console.log(`Object key is ${object.Key}`);
        // console.log(object);
        let params = {
            Bucket: 'mw2-codes-new', /* required */
            Key: object.Key, /* required */
            ACL: "authenticated-read"  // authenticated-read  public-read
        }
         promises.push(s3.putObjectAcl(params).promise());
    }
    let result = await Promise.all(promises).then(value => {
        console.log(value)
    }).catch(e => {
        console.log(e)
    })
})();