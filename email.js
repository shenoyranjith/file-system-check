// Load the AWS SDK for Node.js
let AWS = require("aws-sdk");
// Get and set AWS credentials from the shared file
let credentials = new AWS.SharedIniFileCredentials({
  profile: "<AWS_PROFILE>",
  filename: "<FILE_PATH>"
});
AWS.config.credentials = credentials;
// Set the region
AWS.config.update({ region: "<REGION>" });

const sendMail = function (subjectText, bodyText) {
  // Create sendEmail params
  var params = {
    Destination: {
      /* required */
      ToAddresses: [
        "<TO_ADDRESSES>"
        /* more items */
      ]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Text: {
          Charset: "UTF-8",
          Data: bodyText
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subjectText
      }
    },
    Source: "<FROM_ADDRESSES>" /* required */
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({
    apiVersion: "2010-12-01"
  })
    .sendEmail(params)
    .promise();

  return sendPromise;
};

module.exports = {
  sendMail
};
