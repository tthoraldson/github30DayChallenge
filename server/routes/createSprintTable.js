var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/github_challenge';

// CREATE NEW SPRINT TABLES!!!!
router.post('/create', function (req, res) {
  var sprintName = req.body.sprintName;
  var startDate = styleDate(req.body.sprintDate);
  console.log(sprintName);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('INSERT INTO sprint_history (sprint_name, start_date, currentsprint) VALUES (' + sprintName + ', ' + sprintDate + ', FALSE)',
                function (err, result) {
                  done();

                  if (err) {
                    console.log(err);
                    res.sendStatus(500);
                  }

                  res.sendStatus(201);
                });
  });

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('CREATE TABLE ' + sprintName + ' ' + '_data' +
                '(' +
                'github varchar(50),' +
                'date varchar(12)' +
                'commits boolean' +
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

    client.query('CREATE TABLE ' + sprintName + ' ' + '_teams' +
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

router.post('/currentSprint', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
        // console.log('Connecting to: ', connectionString);
        if (err) {
            res.sendStatus(500);
            console.log("error");
        }

        client.query("SELECT sprint_name from sprint_history WHERE currentSprint=TRUE",
            function(err, result) {
                done();
                if (err) {
                    res.sendStatus(500);
                    console.log('error grabbing the current sprint...')
                    console.log('error: ', err);
                }

                res.sendStatus(201);
                return result.rows[0];
              }
            );
      });
});

router.post('/allSprints', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
        // console.log('Connecting to: ', connectionString);
        if (err) {
            res.sendStatus(500);
            console.log("error");
        }

        client.query("SELECT * from sprint_history",
            function(err, result) {
                done();
                if (err) {
                    res.sendStatus(500);
                    console.log('error grabbing the sprint history...')
                    console.log('error: ', err);
                }

                res.sendStatus(201);
                return result.rows[0];
              }
            );
      });
});


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
