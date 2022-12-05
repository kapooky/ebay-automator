var AWS = require("aws-sdk");
var s3 = new AWS.S3();
var params = {
    Bucket: "oldmw2-codes",
};

// kapwo42
// arcticpe_78
// mw2codesforyou

users = ["mw2codesforyou","arcticpe_78", "mw2codesforyou","kapooky","kapoo-36"];
//Quick Script to delete a tag from an object
(async () => {
    let objects = await s3.listObjectsV2(params).promise().catch((e) => {
        console.log(e)});
    for (const object of objects.Contents) {
       // console.log(object);
        let tags = await s3.getObjectTagging({Bucket: "mw2-codes", Key: object.Key}).promise().catch(e => {
            console.log(e)});
      //  console.log(tags);
        if(tags.TagSet[0])
        if(!tags.TagSet[0].Value ){
            console.log(object.Key);
        }
    }
})();