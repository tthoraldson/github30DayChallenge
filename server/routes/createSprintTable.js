var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/github_challenge';

// CREATE NEW SPRINT TABLES!!!!
router.post('/create', function (req, res) {
  var sprintId = req.body.sprintId;
  console.log(sprintName);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('CREATE TABLE ' + sprintId + ' ' + '_data' +
                '(' +
                'githubUsername varchar(50)' +
                ')',
                function (err, result) {
                  done();

                  if (err) {
                    console.log(err);
                    res.sendStatus(500);
                  }

                  res.sendStatus(201);
                });
  });

  // create sprint-team table
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('CREATE TABLE ' + sprintId + ' ' + '_teams' +
                '(' +
                'id SERIAL PRIMARY KEY,' +
                'github varchar(50),' +
                'team varchar(50)' +
                ')',
                function (err, result) {
                  done();

                  if (err) {
                    console.log(err);
                    res.sendStatus(500);
                  }

                  res.sendStatus(201);
                });
  });
});
// });



module.exports = router;

// FUNCTIONS!

// newSprint(null, '2016-9-20');



function newSprint(sprintName, startDate){
  var myDate = new Date(startDate);
  var dates = [];
  for (var i = 0; i < 30; i++){
    var dayOfMonth = myDate.getDate();
    myDate.setDate(dayOfMonth + 1);

    dates.push(styleDate(myDate));
  }
  console.log(dates);
}

// styles the date to yyyy-mm-dd
function styleDate(date){
  var d = date;

  var day = d.getDate();
  var month = d.getMonth() + 1;

  if (day.toString().length < 2) {
    day = '0' + day;
  }
  if (month.toString().length < 2) {
    month = '0' + month;
  }

  var newDate = d.getFullYear() + '-' + month + '-' + day;
  return newDate;
}
