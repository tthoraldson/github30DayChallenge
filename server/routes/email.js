var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');


router.post('/', function(req, res){
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://githubchallenge%40gmail.com:GotEm!!!@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"GitHub Overlord 👥" <githubchallenge@gmail.com>', // sender address
    to: 'rachelweila@gmail.com, adam.eastvold@gmail.com, theresa.thoraldson@gmail.com, wskcontact@gmail.com', // list of receivers
    subject: 'GitHype', // Subject line
    text: '', // plaintext body
    html: '<b></b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
});

module.exports = router;
