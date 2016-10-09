var express = require('express');
var router = express.Router();
var path = require('path');
var Hogan = require('hogan.js');
var fs = require('fs');
var nodemailer = require('nodemailer');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/github_challenge';

var template = fs.readFileSync('server/public/emails/template.hjs', 'utf-8');
var compiledTemplate = Hogan.compile(template);



function getDate() {
    var todaysDate = new Date();
    var month = todaysDate.getMonth() + 1;
    var day = todaysDate.getDate();
    var year = todaysDate.getFullYear();
    return month + "/" + day + "/" + year;
}



router.post('/', function(req, res){

var emailObj = req.body;
var currentDate = getDate();
// var body = emailObj.body
console.log(emailObj.body);

console.log('addresses sending', emailObj.sendAddress);

// console.log('this is the whitelist:', emailObj.whitelist);
var tempArray = [];
emailObj.whitelist.forEach(function(member){
  console.log(member.email);
  emailObj.emailArray.forEach(function(email){
    if(member.email == email){

    } else {
      tempArray.push(email);
    }
  });
});

console.log('this is the temp array:', tempArray);

if(tempArray.length > 0){
tempArray.forEach(function(userEmail) {


//crazy pg test
pg.connect(connectionString, function(err, client, done) {
    console.log('Start!');
    if (err) {
        res.sendStatus(500);
        console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
    }

    var user = req.body;
    var thequery =
        "INSERT INTO whitelist (email) VALUES ($1)";


    client.query(thequery, [userEmail],
        function(err, result) {
            done(); //closes connection, I only can have ten :
            if (err) {
                res.sendStatus(500);
                console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, client.query: ", err, "\n \n \n \n");
                return;
            }
            // console.log('result: ', result.rows);

            console.log('GET REQ: insert to users complete]')

        })

    //look here

      });
    });
  }

































// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://githubchallenge%40gmail.com:GotEm!!!@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Commitment | Github Challenge" <githubchallenge@gmail.com>', // sender address
    to: emailObj.sendAddress, // list of receivers
    subject: emailObj.subject, // Subject line
    text: '', // plaintext body
    html: compiledTemplate.render({
      // displayName: emailObj.displayName
      header: emailObj.header,
      body: emailObj.body,
      currentDate: currentDate
    }) // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    res.sendStatus(201);
    return console.log(info.response);
});

});

module.exports = router;
