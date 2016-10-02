var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/github_challenge';
//var commits = require('../modules/getCommits');
var phantom = require('phantom');

router.get('/', function(req, res) {

    console.log("The database name: ", req.query);

    pg.connect(connectionString, function(err, client, done) {
        console.log('Start!');
        if (err) {
            res.sendStatus(500);
            console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
        }

        var thequery =
            "SELECT * FROM " + req.query.db;


        client.query(thequery,
            function(err, result) {
                done(); //closes connection, I only can have ten :
                if (err) {
                    res.sendStatus(500);
                    console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, client.query: ", err, "\n \n \n \n");
                    return;
                }
                // console.log('result: ', result.rows);

                console.log('GET REQ: grabbing ' + req.query.db + ' table from db')
                res.send(result.rows)
            })


    });
});


// POST USER URL AND OTHER FIREBAUSE AUTH INFORMATION ON FIRST TIME LOGGIN
router.post('/', function(req, res) {
  // console.log();

  var swagArray = [];
  var sitepage = null;
  var phInstance = null;
  var usernumber = req.body.providerData[0].uid;


    phantom.create()
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
            sitepage = page;
            return page.open('https://api.github.com/user/' + usernumber);
        })
        .then(status => {
            console.log(status);

            return sitepage.property('content');
        })
        .then(content => {
            swagArray = content.split('\n');

            var tempArray = [];
            console.log(swagArray[6].substring(15, swagArray[6].length - 2));

             pg.connect(connectionString, function(err, client, done) {
                 console.log('Start!');
                 if (err) {
                     res.sendStatus(500);
                     console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
                 }

                 var user = req.body;
                 var thequery =
                     "INSERT INTO users (github_url, email, display_name, user_id, profile_photo, auth_level) VALUES ($1, $2, $3, $4, $5, $6)";


                 client.query(thequery, [swagArray[6].substring(15, swagArray[6].length - 2), user.email, user.displayName, usernumber, user.photoURL, 33],
                     function(err, result) {
                         done(); //closes connection, I only can have ten :
                         if (err) {
                             res.sendStatus(500);
                             console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, client.query: ", err, "\n \n \n \n");
                             return;
                         }
                         // console.log('result: ', result.rows);

                         console.log('GET REQ: insert to users complete]')
                         res.send(result.rows)
                     })


             });

        })
        .then(content => {
            // console.log(swagArray[1]);
            sitepage.close();
            phInstance.exit();
        })
        .catch(error => {
            console.log(error);
            phInstance.exit()
        })
});

// GET ALL GITHUB USERNAMES FROM DB
router.get('/usernames', function(req,res){
  pg.connect(connectionString, function(err, client, done) {
      console.log('Start!');
      if (err) {
          res.sendStatus(500);
          console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
      }

      client.query('SELECT github_url FROM users',
          function(err, result) {
              done();
              if (err) {
                  res.sendStatus(500);
                  console.log('error: ', err);
                  return;
              }
              res.send(result.rows)
          })
  });
});

// UPDATE TODAY'S DATE FOR A SINGLE USER
router.post('/daily/:uname', function(req, res) {
  var githubUname = uname;
  var swagArray = [];
  var sitepage = null;
  var phInstance = null;

  phantom.create()
      .then(instance => {
          phInstance = instance;
          return instance.createPage();
      })
      .then(page => {
          sitepage = page;
          return page.open('https://github.com/users/' + githubUname + '/contributions');
      })
      .then(status => {
          console.log(status);

          return sitepage.property('content');
      })
      .then(content => {
          swagArray = content.split('\n');

          var tempArray = [];
          swagArray.forEach(function(line) {
            if (line.substring(11,14) == "rec"){
              var templine = line.substring(84);
              var templine2 = ""
              if (templine[0] == 'c'){
                templine = templine.substring(1);
              } else if (templine[0] == '-') {
                templine = templine.substring(2);
              } else if (templine[0] == 'a') {
                templine = templine.substring(3);
              }

              templine = templine.substring(6); // commits
              templine2 = templine.substring(14, 24); // date
              templine = templine[0];
              tempArray.push({data: templine, date: templine2});
            }
          });

          // finds the data matching today's date!
          var foundObject = tempArray.find(findObject);

          pg.connect(connectionString, function(err, client, done) {
              console.log('Connecting to: ', connectionString);
              if (err) {
                  res.sendStatus(500);
                  console.log("error");
              }

              var user = req.body;

              client.query("INSERT INTO sprint3 (github, date, commits) VALUES ($1, $2, $3)",
              [githubUname, foundObject.date, foundObject.data],
                  function(err, result) {
                      done();
                      if (err) {
                          res.sendStatus(500);
                          console.log('error: ', err);
                      }

                      console.log('');
                      res.send(result.rows)
                  })
          })
      })
      .then(content => {
          sitepage.close();
          phInstance.exit();
      })
      .catch(error => {
          console.log(error);
          phInstance.exit()
      })
});

// GET ENTIRE SPRINT COMMITS!
router.post('/sprint/:uname', function(req, res) {
  var githubUname = uname;
  var swagArray = [];
  var sitepage = null;
  var phInstance = null;

  phantom.create()
      .then(instance => {
          phInstance = instance;
          return instance.createPage();
      })
      .then(page => {
          sitepage = page;
          return page.open('https://github.com/users/' + githubUname + '/contributions');
      })
      .then(status => {
          console.log(status);

          return sitepage.property('content');
      })
      .then(content => {
          swagArray = content.split('\n');

          var tempArray = [];
          swagArray.forEach(function(line) {
            if (line.substring(11,14) == "rec"){
              var templine = line.substring(84);
              var templine2 = ""
              if (templine[0] == 'c'){
                templine = templine.substring(1);
              } else if (templine[0] == '-') {
                templine = templine.substring(2);
              } else if (templine[0] == 'a') {
                templine = templine.substring(3);
              }

              templine = templine.substring(6); // commits
              templine2 = templine.substring(14, 24); // date
              templine = templine[0];
              tempArray.push({data: templine, date: templine2});
            }
          });

          // finds the data matching today's date!
          var foundObject = tempArray.find(findObject);

          pg.connect(connectionString, function(err, client, done) {
              console.log('Connecting to: ', connectionString);
              if (err) {
                  res.sendStatus(500);
                  console.log("error");
              }

              var user = req.body;

              client.query("INSERT INTO sprint3 (github, date, commits) VALUES ($1, $2, $3)",
              [githubUname, foundObject.date, foundObject.data],
                  function(err, result) {
                      done();
                      if (err) {
                          res.sendStatus(500);
                          console.log('error: ', err);
                      }

                      console.log('');
                      res.send(result.rows)
                  })
          })
      })
      .then(content => {
          sitepage.close();
          phInstance.exit();
      })
      .catch(error => {
          console.log(error);
          phInstance.exit()
      })
});

module.exports = router;

// FUNCTIONS!


// get today's date
function getDate(){
  var d = new Date();
  var day = d.getDate();
  var month = d.getMonth() + 1;

  if (day.toString().length < 2) {
    day = '0' + day;
  }

  if (month.toString().length < 2) {
    month = '0' + month;
  }

  var date = d.getFullYear() + '-' + month + '-' + day;
  return date;
}

// find object in tempArray with today's date (gets commits for that day)
function findObject(entry) {
    return entry.date === getDate();
}
