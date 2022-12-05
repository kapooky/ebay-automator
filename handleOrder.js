const path = require("path");
const FormData = require("form-data");
const fs = require("fs");
const {recordTransaction} = require("./dynamodb");
const {fetchcodes} = require("./dynamodb");

var AWS = require("aws-sdk");
var s3 = new AWS.S3();

var params = {
  Bucket: "mw2-codes",
};

// https://stackoverflow.com/questions/39538473/using-settimeout-on-promise-chain
function delay(t, v) {
  return new Promise(resolve => setTimeout(resolve, t, v));
}

async function handleOrder(order, eBayApi) {
  //Notify the buyer with a message
  let count = order.lineItems[0].quantity;
  console.log("the Quantity is " + count);

    //console.log(`LegacyItemId ${item.legacyItemId} legacyOrderID ${order.legacyOrderId} ${item.lineItemId} ${order.buyer.username}`);
    //let image = await getImageCode(eBayApi);
    let buyername = order.buyer.username;
    let address = order.buyer.taxAddress;
    const codes  = await fetchcodes(count,buyername);
  //  s3links = await  fetchs3Links(buyername, count).catch((e) => {throw e});

    const messageObject = {
      api: eBayApi,
      buyername: buyername,
      id: order.lineItems[0].legacyItemId,
      s3links: codes,
    }

    //Record the transaction First
    await recordTransaction( order.legacyOrderId.toString(), codes.toString(), buyername,address);
    let messageResult = await sendOrderMessage(messageObject).catch((e) => {
      console.log();
      throw e; });
    await delay(120000);
    sendGoodbyeMessage(messageObject).catch((e) => {
      console.log(e);
      throw e;});
    console.log(messageResult);

    //Record the order in the dynamomoDB table
    console.log("RESULT FINISHED");
}


async function sendOrderMessage(obj) {
  const bkLink = "https://callofduty.com/bkredeem";
  let body = "Here are your code(s):\n"
    for(let i = 0; i < obj.s3links.length; i++){
      body+= obj.s3links[i];
      body+="\n"
    }
    body+= "Reedem  at: " + bkLink;

  console.log(body);
  let result = await obj.api.trading.AddMemberMessageAAQToPartner({
    ItemID: obj.id,
    Mem6berMessage: {
      Body: body.toString(),
      QuestionType: "CustomizedSubject",
      Subject: "✅Here's your MW2 Burger Town Code!",
      RecipientID: obj.buyername,
    },
  });
}

async function sendGoodbyeMessage(obj) {
  const catPic = "https://i.ebayimg.com/00/s/OTQwWDcwNQ==/z/xsoAAOSwhchjgdKg/$_1.JPG";
  // Send Message
  let result = await obj.api.trading.AddMemberMessageAAQToPartner({
    ItemID: obj.id,
    MemberMessage: {
      Body:  `
  Everything going well with the code? \n
  Let me know if any issues arise \n
  Kind regards, \n
  John `,
      QuestionType: "CustomizedSubject",
      Subject: "Hope everything went well",
      RecipientID: obj.buyername,
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
  else return
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
