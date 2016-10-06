var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/github_challenge';
var phantom = require('phantom');

//finds all users in database with github auth info
router.get('/users',function(req,res){
  pg.connect(connectionString, function(err, client, done) {
      //console.log('Start!');
      if (err) {
          res.sendStatus(500);
          //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
      }

      var thequery =
          "SELECT * FROM users"


      client.query(thequery,
          function(err, result) {
              done(); //closes connection, I only can have ten :
              if (err) {
                  res.sendStatus(500);
                  //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, client.query: ", err, "\n \n \n \n");
                  return;
              }
              // //console.log('result: ', result.rows);

              //console.log('GET REQ: grabbing ' + req.query.db + ' table from db')
              res.send(result.rows)
          })
  });
});


//finds all commit data on sprint2
router.get('/sprint2_data',function(req,res){
  pg.connect(connectionString, function(err, client, done) {
      //console.log('Start!');
      if (err) {
          res.sendStatus(500);
          //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
      }

      var thequery =
          "SELECT * FROM s2_data"


      client.query(thequery,
          function(err, result) {
              done(); //closes connection, I only can have ten :
              if (err) {
                  res.sendStatus(500);
                  //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, client.query: ", err, "\n \n \n \n");
                  return;
              }
              // //console.log('result: ', result.rows);

              //console.log('GET REQ: grabbing ' + req.query.db + ' table from db')
              res.send(result.rows)
          })
  });
});


//finds all users and their teams from sprint2
router.get('/sprint2_teams',function(req,res){
  pg.connect(connectionString, function(err, client, done) {
      //console.log('Start!');
      if (err) {
          res.sendStatus(500);
          //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
      }

      var thequery =
          "SELECT * FROM s2_teams"


      client.query(thequery,
          function(err, result) {
              done(); //closes connection, I only can have ten :
              if (err) {
                  res.sendStatus(500);
                  //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, client.query: ", err, "\n \n \n \n");
                  return;
              }
              // //console.log('result: ', result.rows);

              //console.log('GET REQ: grabbing ' + req.query.db + ' table from db')
              res.send(result.rows)
          })
  });
});


//updates member in db to have auth_level: 11;
router.put('/approveMember', function(req,res){
  var user = req.body;
  console.log('user to be approved ', user)
  pg.connect(connectionString, function(err, client, done) {
      //console.log('Start!');
      if (err) {
          res.sendStatus(500);
          //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
      }

      var thequery =
        "UPDATE users SET auth_level = $1 WHERE user_id = $2"


      client.query(thequery, [11, user.user_id],
          function(err, result) {
              done(); //closes connection, I only can have ten :
              if (err) {
                  res.sendStatus(500);
                  //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, client.query: ", err, "\n \n \n \n");
                  return;
              }
              // //console.log('result: ', result.rows);

              //console.log('GET REQ: grabbing ' + req.query.db + ' table from db')
              res.send(result.rows)
          })
  });
});


//find all members in sprint2_teams
//attach all data in sprint2_data to member
router.get('/sprint2_100'), function(req,res){

  pg.connect(connectionString, function(err, client, done) {
      //console.log('Start!');
      if (err) {
          res.sendStatus(500);
          //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
      }

      var thequery =
          "SELECT s2_teams.github, team, date, commits FROM s2_teams RIGHT JOIN s2_data on s2_teams.github = s2_data.github"

          console.log('works?');
      client.query(thequery,
          function(err, result) {
              done(); //closes connection, I only can have ten :
              if (err) {
                  // res.sendStatus(500);
                  //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, client.query: ", err, "\n \n \n \n");
                  return;
              }
              //console.log('result: ', result.rows);
              res.send(result.rows);
          })
  });

} //end of put.sprint2_100



module.exports = router;
