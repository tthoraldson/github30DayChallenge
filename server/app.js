var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');
var phantom = require('phantom');

// MODULES & ROUTES
var index = require('./routes/index');
var email = require('./routes/email');
var userData = require('./routes/userData');
// Serve back static files

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

// Routes
app.use('/', index);
app.use('/email', email);
app.use('/userData', userData)

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});


var swagArray = [];
var sitepage = null;
var phInstance = null;
var usernumber = 19336103;




//-------------------------------GET ALL FROM LAWNS
// var swagArray = [];
// var sitepage = null;
// var phInstance = null;
// phantom.create()
//     .then(instance => {
//         phInstance = instance;
//         return instance.createPage();
//     })
//     .then(page => {
//         sitepage = page;
//         return page.open('https://github.com/users/tthoraldson/contributions');
//     })
//     .then(status => {
//         console.log(status);
//
//         return sitepage.property('content');
//     })
//     .then(content => {
//         swagArray = content.split('\n');
//
//         var tempArray = [];
//         swagArray.forEach(function(line) {
//           if (line.substring(11,14) == "rec"){
//             var templine = line.substring(84);
//             var templine2 = ""
//             if (templine[0] == 'c'){
//               templine = templine.substring(1);
//             } else if (templine[0] == '-') {
//               templine = templine.substring(2);
//             } else if (templine[0] == 'a') {
//               templine = templine.substring(3);
//             }
//
//             templine = templine.substring(6);
//             templine2 = templine.substring(14, 24);
//             templine = templine[0];
//             tempArray.push({data: templine, date: templine2});
//             // tempArray.push(line);
//
//           }
//         });
//         tempArray.forEach(function(data){
//           console.log(data);
//         })
//     })
//     .then(content => {
//         // console.log(swagArray[1]);
//         sitepage.close();
//         phInstance.exit();
//     })
//     .catch(error => {
//         console.log(error);
//         phInstance.exit()
//     })
