// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// const SMTPConnection = require("nodemailer/lib/smtp-connection");

// let connection = new SMTPConnection(Options);

// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = 'mohammedsoban27@gmail.com';
const gmailPassword = 'Soban123.';
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Cloud Storage for Firebase quickstart';

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
// [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email; // The email of the user.
  const displayName = user.displayName;
 // The display name of the user.
  // [END eventAttributes]

  return sendWelcomeEmail(email, displayName);
});
// [END sendWelcomeEmail]

// [START sendByeEmail]
/**
 * Send an account deleted email confirmation to users who delete their accounts.
 */
// [START onDeleteTrigger]

// [END sendByeEmail]


exports.sendQuery = functions.firestore
    .document('Queries/{QueriesId}')
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();

      // access a particular field as you would any JS property
      const name = newValue.name;
      const email = newValue.email;
      const subject = newValue.subject;
      const message = newValue.message;

      // perform desired operations ...
      return sendQueryEmail(name,email,subject,message);
    });
///////////////////////////
exports.sendReference = functions.firestore

    .document('Queries/{QueriesId}')
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();
       
      // access a particular field as you would any JS property
      const referenceID= context.params.QueriesId
      const name = newValue.name;
      const email = newValue.email;
      // perform desired operations ...
      return sendReferenceEmail(email,referenceID,name);
    });

///////////////////

////here
exports.closeQuery = functions.firestore
    .document('Queries/{QueriesId}')
    .onDelete((snap, context) => {
      // Get an object representing the document prior to deletion
      // e.g. {'name': 'Marie', 'age': 66}
      const deletedValue = snap.data();
      const referenceID= context.params.QueriesId
      const name = deletedValue.name;
      const email = deletedValue.email;
      // perform desired operations ...
      return sendQueryCloseEmail(email,referenceID,name);
    });


// Sends a welcome email to the given user.
async function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account.`;
  await mailTransport.sendMail(mailOptions);
  console.log('New welcome email sent to:', email);

  return null;
}


async function sendQueryEmail(name,email,subject,message) {
  const mailOptions = {
    from:`${email}`,
    to: 'mohammedsoban1@gmail.com',
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Query ${subject}`;
  mailOptions.text = `${name} says "${message}"  reply me back on ${email}`;
  await mailTransport.sendMail(mailOptions);
  console.log('New welcome email sent to:', email);

  return null;
}

////////////////////////
async function sendReferenceEmail(email,referenceID,name) {
  const mailOptions = {
    from:`MoonSteelFab`,
    to: `${email}`,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `MoonSteelFab: your query has been successfully posted`;
  mailOptions.text = `Dear ${name}, 
  

  your query refernce ID is:${referenceID}

  this is an automated email don't reply Thankyou!`;
  await mailTransport.sendMail(mailOptions);
  console.log('New welcome email sent to:', email);

  return null;
}

/////here
async function sendQueryCloseEmail(email,referenceID,name) {
  const mailOptions = {
    from:`MoonSteelFab`,
    to: `${email}`,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `MoonSteelFab: your query has been closed`;
  mailOptions.text = `Dear ${name}, 
  
  your query with refernce ID:${referenceID} has been closed.


  this is an automated email don't reply Thank you!`;
  await mailTransport.sendMail(mailOptions);
  console.log('New welcome email sent to:', email);

  return null;
}



