var express = require('express');
var router = express.Router();
var path = require('path');
var Hogan = require('hogan.js');
var fs = require('fs');
var nodemailer = require('nodemailer');


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

console.log('display name?', emailObj.displayName);

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://githubchallenge%40gmail.com:GotEm!!!@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"GitHub Overlord 👥" <githubchallenge@gmail.com>', // sender address
    to: emailObj.sendAddress, // list of receivers
    subject: emailObj.subject, // Subject line
    text: '', // plaintext body
    html: compiledTemplate.render({
      // displayName: emailObj.displayName
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
