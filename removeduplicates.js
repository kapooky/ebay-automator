var AWS = require("aws-sdk");
var s3 = new AWS.S3();


var params = {
    Bucket: "mw2-codes",
};

//Quick Script to delete a tag from an object
(async () => {
    let objects = await s3.listObjectsV2(params).promise();
    for (const object of objects.Contents) {
       // console.log(object);
        let tags = await s3.getObjectTagging({Bucket: "mw2-codes", Key: object.Key}).promise();
      //  console.log(tags);
        if(tags.TagSet[0].Value === 'elljoh9853'){
            console.log("found one")
            s3.deleteObjectTagging(
                {
                    Bucket: "mw2-codes",
                    Key: object.Key,
                },
                function (err, data) {
                    if (err) throw (err, err.stack); // an error occurred
                    else console.log(`Succesfully Updated the tag for ${object.Key}`);
                }
            );
        }
    }
})();

