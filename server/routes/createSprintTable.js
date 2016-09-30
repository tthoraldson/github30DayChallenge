// CREATE TABLE sprint3 (
// id SERIAL PRIMARY KEY,
// member_name        varchar(50),
// member_team        varchar(50),
// team_score         integer,
// member_score       integer,
// date_8_23          integer,
// date_8_24          integer,
// date_8_25          integer,
// date_8_26          integer,
// date_8_27          integer,
// );

var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/github_challenge';

newSprint(null, '2016-9-20');

// sprintName = name of the table for the sprint
// startDate = date the sprint will start on
function newSprint(sprintName, startDate){
  var myDate = new Date(startDate);
  var dates = [];
  for (var i = 0; i < 30; i++){
    var dayOfMonth = myDate.getDate();
    myDate.setDate(dayOfMonth + 1);

    dates.push(styleDate(myDate));
  }
  console.log(dates);
  // CREATE TABLE

  router.post('/', function (req, res) {

    pg.connect(connectionString, function (err, client, done) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }

      client.query('CREATE TABLE ' + sprintName + ' ' +
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
  });

  // ADD ROWS

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
