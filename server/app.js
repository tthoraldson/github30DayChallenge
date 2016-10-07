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
var databaseBuild = require('./routes/databaseBuild');
var formData = require('./routes/formData');
// Serve back static files

var createSprintTable = require('./routes/createSprintTable');

var newRoute = require('./routes/newRoute');







// Serve back static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

// Routes
app.use('/', index);
app.use('/email', email);
app.use('/userData', userData)
app.use('/databaseBuild', databaseBuild);
app.use('/formData', formData);
app.use('/newRoute', newRoute);

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
