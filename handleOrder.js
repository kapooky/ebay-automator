const path = require('path');
const FormData = require('form-data');
const fs = require("fs");

var AWS = require('aws-sdk');
var s3 = new AWS.s3(); 


var params = {
  Bucket: 'mw2-codes'
}



async function fetchS3ImageLink(s3) {
 return s3.listObjects.promise(); 
}
// var S3 = require('aws-sdk/clients/s3');



async function handleOrder(order,eBayApi){
    //Notify the buyer with a message 
    
    //Upload the image as well 

    console.log("We are in the handler Ordder Function");
    let count = order.lineItems.length; 

    for(const item of order.lineItems){
    //console.log(`LegacyItemId ${item.legacyItemId} legacyOrderID ${order.legacyOrderId} ${item.lineItemId} ${order.buyer.username}`);
    //let image = await getImageCode(eBayApi); 

    fetchS3ImageLink(); 

   // sendMessage(messageBody, order.buyer.username);
        
    };
  };


  async function sendMessage(s3link,buyername) {
    const catPic = "https://i.ebayimg.com/00/s/OTQwWDcwNQ==/z/xsoAAOSwhchjgdKg/$_1.JPG";
    // Send Message
    let result = await eBayApi.trading.AddMemberMessageAAQToPartner({
        ItemID: item.legacyItemId,
        MemberMessage: {
            Body: constructMessageBody(s3link),
            QuestionType: "CustomizedSubject",
            Subject: "✅Here's your MW2 Burger Town Code!!",
            RecipientID: buyername,
            MessageMedia: {
             MediaURL: catPic,
             MediaName: "Cat"
            }
        }
    });
  }

  async function constructMessageBody(s3link) {
    const bkLink = "https://callofduty.com/bkredeem"
    return `Enjoy :) Don't forget to rate my ebay profile for a chance to win a Jack Links Ghillie FULL SET🔥 DAILY GIVEAWAYS!!
    Here is your code!! ${s3link}.toString()
    Go to ${bkLink} to redeem your code!
    If the code is too blurry, contact me`; 
  }
  

    // Main function 
  async function getImageCode(eBay){
    try {
      const image = fs.readFileSync(path.resolve(__dirname, 'code.jpg'));
  
      // const image = fs.readFileSync(path.resolve(__dirname, 'upload_bad_quality.jpg'));
      // --> To reduce possible issues with picture display quality, eBay recommends that pictures you upload have a JPEG quality value of 90 or greater.
      const response = await eBay.trading.UploadSiteHostedPictures({
        ExtensionInDays: 25,
      }, {
        hook: (xml) => {
          const form = new FormData();
          // XML should be always first
          form.append('XML Payload', xml, 'payload.xml');
          form.append('dummy', image)
          return {
            body: form,
            headers: form.getHeaders()
          }
        }
      });
  
      console.log(response); 
      return response; 
    }

        catch (e) {
      console.log(JSON.stringify(e, null, 2));
    }
}

  module.exports = handleOrder; 