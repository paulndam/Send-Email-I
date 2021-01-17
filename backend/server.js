


const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const transporter = require('./config/config.js')

require("dotenv").config();

const buildPath = path.join(__dirname, "..", "build");

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(buildPath));

// creating post request handler for /send endpoint so when we make an API call from our React app to /send URL, this handler will be executed
app.post("/send", (req, res) => {
  console.log(req.body);
//   res.send(req.body);

  try{
      const mailOptions ={
          
          from:req.body.email,//senders email
          to:process.env.email,//list of recievers
          subject: req.body.subject,//subject line
          html:`
          <p>You do have a new contact request</p>
          <h3>Contact Detial</h3>
          <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Subject: ${req.body.subject}</li>
            <li>Message: ${req.body.message}</li>
          </ul>
          `
      }
      

      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              res.status(500).send({
                  success:false,
                  message:`error, please try later`
              })
          }else{
              res.send({
                  success:true,
                  message:`Thank you for contacting us. We shall get back to you soon`
              })
          }

      })

  }
  catch(error){
      console.error(error)
      res.status(500).send({
          success:false,
          message:`there's something wrong please try later`
      })

  }
});

const DB_Port = process.env.Port;

app.listen(DB_Port, () => {
  console.log(`Server all Up and Running On Port  ====> ${DB_Port}`);
});
