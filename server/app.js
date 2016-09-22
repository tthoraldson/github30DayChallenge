var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');


// MODULES & ROUTES
var index = require('./routes/index');

// Serve back static files

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

// Routes

app.use('/', index);




app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
