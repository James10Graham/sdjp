const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3500;

const urlencodedparser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

const server = app.listen(PORT, (err)=>{
    if(err){
        console.log(JSON.stringify(err, undefined, 2));
    }
    else{
        console.log(`Listening on port: ${PORT}`);
    }
});

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get("/shop", (req, res)=>{
    res.sendFile(__dirname + "/shop.html");
});

app.get("/presenters", (req, res)=>{
    res.sendFile(__dirname + "/presentersLanding.html");
});

app.get("/presenters/echo",(req, res)=>{
    res.sendFile(__dirname + "/echo.html");
});

app.get("/presenters/comic-marvel",(req, res)=>{
    res.sendFile(__dirname + "/comic.html");
});

app.get("/presenters/dj-double-k",(req, res)=>{
    res.sendFile(__dirname + "/djdk.html");
});

app.get("/presenters/evolve",(req, res)=>{
    res.sendFile(__dirname + "/evolve.html");
});

app.post("/sent", urlencodedparser,(req, res)=>{
    console.log(req.body);

    let output = `
<h1>New Message</h1>
    
`;

    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "shropshiredjsmtp@hotmail.com",
          pass: "shropshireDJ123"
        },
        rejectUnauthorized: false
    });

    let mailOptions = {
        from: '"Shropshire DJ Podcast" <shropshiredjsmtp@hotmail.com>', // sender address
        to: "james_graham349@hotmail.com", // list of receivers info@shropshiredjpodcast.co.uk
        subject: "New Message!", // Subject line
        html: output // html body
      };

      transporter.sendMail(mailOptions, (error, info)=>{
          if(error){
              return console.log(JSON.stringify(error, undefined, 2));
          }

          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          res.sendFile(__dirname + "/sent.html");
      });
});