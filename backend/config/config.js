require('dotenv').config()

const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email, //email address to send email from
    pass: process.env.password,
  },
});

module.exports = transporter;
