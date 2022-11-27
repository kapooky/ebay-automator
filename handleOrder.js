const path = require("path");
const FormData = require("form-data");
const fs = require("fs");
const recordTransaction = require("./dynamodb");

var AWS = require("aws-sdk");
var s3 = new AWS.S3();

var params = {
  Bucket: "mw2-codes",
};

async function fetchS3ImageLink(buyername) {
  let objects = await s3.listObjectsV2(params).promise();

  for (const object of objects.Contents) {
    console.log(object);
    let tags = await s3
      .getObjectTagging({ Bucket: "mw2-codes", Key: object.Key })
      .promise();
    console.log(tags);
    if (tags.TagSet.length == 0) {
      s3.putObjectTagging(
        {
          Bucket: "mw2-codes",
          Key: object.Key,
          Tagging: { TagSet: [{ Key: "User", Value: buyername }] },
        },
        function (err, data) {
          if (err) throw (err, err.stack); // an error occurred
          else console.log(`Succesfully Updated the tag for ${object.Key}`);
        }
      );
      //return the code
      return `https://mw2-codes.s3.amazonaws.com/${object.Key}`;
    }
  }
  throw "No more codes Left in the S3 Bucket";
}
// https://stackoverflow.com/questions/39538473/using-settimeout-on-promise-chain
function delay(t, v) {
  return new Promise(resolve => setTimeout(resolve, t, v));
}

async function handleOrder(order, eBayApi) {
  //Notify the buyer with a message

  let count = order.lineItems.length;

  for (const item of order.lineItems) {
    //console.log(`LegacyItemId ${item.legacyItemId} legacyOrderID ${order.legacyOrderId} ${item.lineItemId} ${order.buyer.username}`);
    //let image = await getImageCode(eBayApi);
    let buyername = order.buyer.username;

    let s3imagelink = await fetchS3ImageLink(buyername);

    let messageResult = await sendMessage(
      item.legacyItemId,
      s3imagelink,
      buyername,
      eBayApi
    ).delay(10000).sendMessage().catch((e) => {
      throw e;
    });
    console.log(messageResult);

    //Record the order in the dynamomoDB table
    let result = await recordTransaction(
      order.legacyOrderId,
      s3imagelink,
      buyername
    );
    console.log("RESULT FINISHED");
  }
}

async function sendMessage(itemId, s3link, buyername, eBayApi) {
  const catPic =
    "https://i.ebayimg.com/00/s/OTQwWDcwNQ==/z/xsoAAOSwhchjgdKg/$_1.JPG";
  // Send Message
  let result = await eBayApi.trading.AddMemberMessageAAQToPartner({
    ItemID: itemId,
    MemberMessage: {
      Body: constructMessageBody(true,s3link),
      QuestionType: "CustomizedSubject",
      Subject: "✅Here's your MW2 Burger Town Code!",
      RecipientID: buyername,
      MessageMedia: {
        MediaURL: catPic,
        MediaName: "Cat",
      },
    },
  });
}

async function sendMessage() {
  const catPic =
    "https://i.ebayimg.com/00/s/OTQwWDcwNQ==/z/xsoAAOSwhchjgdKg/$_1.JPG";
  // Send Message
  let result = await eBayApi.trading.AddMemberMessageAAQToPartner({
    ItemID: itemId,
    MemberMessage: {
      Body: constructMessageBody(false),
      QuestionType: "CustomizedSubject",
      Subject: "Hope everything went well",
      RecipientID: buyername,
      MessageMedia: {
        MediaURL: catPic,
        MediaName: "Cat",
      },
    },
  });
}

function constructMessageBody(isCodeorder, s3link = null,) {
  if(isCodeorder){
  const bkLink = "https://callofduty.com/bkredeem";
  return `
    Here is your code: ${s3link} \n
    Redeem at ${bkLink} `;
  }
  else return `
  Let me know if everything worked well for you
  Kind regards,
  John `;
}

// Main function
async function getImageCode(eBay) {
  try {
    const image = fs.readFileSync(path.resolve(__dirname, "code.jpg"));

    // const image = fs.readFileSync(path.resolve(__dirname, 'upload_bad_quality.jpg'));
    // --> To reduce possible issues with picture display quality, eBay recommends that pictures you upload have a JPEG quality value of 90 or greater.
    const response = await eBay.trading.UploadSiteHostedPictures(
      {
        ExtensionInDays: 25,
      },
      {
        hook: (xml) => {
          const form = new FormData();
          // XML should be always first
          form.append("XML Payload", xml, "payload.xml");
          form.append("dummy", image);
          return {
            body: form,
            headers: form.getHeaders(),
          };
        },
      }
    );

    console.log(response);
    return response;
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
  }
}

module.exports = handleOrder;
