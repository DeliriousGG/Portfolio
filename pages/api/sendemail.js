const nodemailer = require('nodemailer');
require('dotenv/config');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const corsMiddleware = cors();


const handler = async (req, res) => {
  corsMiddleware(req, res, async () => {
  if (req.method === 'POST') {
    const { fullname, email, message, phone, subject } = req.body;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });


    let info = await transporter.sendMail({
      from: email,
      to: process.env.SMTP_EMAIL,
      subject: 'Received a message from your website',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>The Penn Digitals Interest Check</title>
          <style>
            /* Styles here */
          </style>
        </head>
        <body>
          <div class="container">
            <div class="center">  
                You have received an email from ${fullname}. Here is the content of the message.
              </div>
            </div>

            <div class="content">
              <div class="content-holder" >
                <div class="title">Name: </div><div class="name-email">${fullname}</div>
              </div>

              <div class="content-holder">
                <div class="title">Email:</div> 
                <div class="name-email">${email}</div>
              </div>

              <div class="content-holder">
                <div class="title">Subject:</div> 
                <div class="name-email">${subject}</div>
              </div>

              <div class="content-holder">
                <div class="title">Phone Number:</div> 
                <div class="name-email">${phone}</div>
              </div>
              

              <div class="content-holder">
                <div class="title"> Message: </div>
                <div class="message-container">
                  ${message}
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Message sent:', info.messageId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Method Not Allowed' }));
  }}
)};

module.exports = handler;