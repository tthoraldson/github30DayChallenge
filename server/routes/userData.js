var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/github_challenge';
var phantom = require('phantom');

// DECLARED VARS
var i = 0;
var results;
var timer;
var tempSprintDates;

router.get('/', function(req, res) {

    //console.log("The database name: ", req.query);

    pg.connect(connectionString, function(err, client, done) {
        //console.log('Start!');
        if (err) {
            res.sendStatus(500);
            //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
        }

        var thequery =
            "SELECT * FROM " + req.query.db;


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


// POST USER URL AND OTHER FIREBAUSE AUTH INFORMATION ON FIRST TIME LOGGIN
router.post('/', function(req, res) {
    // //console.log();

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
            // //console.log(status);

            return sitepage.property('content');
        })
        .then(content => {
            swagArray = content.split('\n');

            var tempArray = [];
            // //console.log(swagArray[6].substring(15, swagArray[6].length - 2));

            pg.connect(connectionString, function(err, client, done) {
                //console.log('Start!');
                if (err) {
                    res.sendStatus(500);
                    //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
                }

                var user = req.body;
                var thequery =
                    "INSERT INTO users (github_url, email, display_name, user_id, profile_photo, auth_level) VALUES ($1, $2, $3, $4, $5, $6)";


                client.query(thequery, [swagArray[6].substring(15, swagArray[6].length - 2), user.email, user.displayName, usernumber, user.photoURL, 11],
                    function(err, result) {
                        done(); //closes connection, I only can have ten :
                        if (err) {
                            res.sendStatus(500);
                            //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, client.query: ", err, "\n \n \n \n");
                            return;
                        }
                        // //console.log('result: ', result.rows);

                        //console.log('GET REQ: insert to users complete]')
                        res.send(result.rows)
                    })

                //look here
                //write pg connection to insert new value into user_lawn(?) db
                var userURL = swagArray[6].substring(15, swagArray[6].length - 2)
                    //substring the url to find the username for the pg post query

            });
        })
        .then(content => {
            // //console.log(swagArray[1]);
            sitepage.close();
            phInstance.exit();
        })
        .catch(error => {
            //console.log(error);
            phInstance.exit()
        })
});

router.post('/', function(req, res) {
    // INSERT INTO QUESTIONS TABLE
    //console.log('THIS IS THE DATA', req.body);

    pg.connect(connectionString, function(err, client, done) {
        //console.log('Start!');
        if (err) {
            res.sendStatus(500);
            //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, pg.connect", err, "\n \n \n \n");
        }

        var thequery =
            'UPDATE users SET display_name = $1 WHERE id = $2';

        //
        client.query(thequery, [req.body.newData, req.body.oldData.id],
            function(err, result) {
                done(); //closes connection, I only can have ten :
                if (err) {
                    res.sendStatus(500);
                    //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, client.query: ", err, "\n \n \n \n");
                    return;
                }
                // //console.log('result: ', result.rows);

                //console.log('POST COMPLETE: INSERTED QUESTIONS TO DB')
            })
    });
});



// GET ALL GITHUB USERNAMES FROM DB
router.get('/usernames', function(req, res) {
    pg.connect(connectionString, function(err, client, done) {
        //console.log('Start!');
        if (err) {
            res.sendStatus(500);
            //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
        }

        client.query('SELECT github_url FROM users',
            function(err, result) {
                done();
                if (err) {
                    res.sendStatus(500);
                    //console.log('error: ', err);
                    return;
                }
                res.send(result.rows)
            })
    });
});

router.post('/today', function(req, res, next) {
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
                //console.log(result.rows);
                sprint = result.rows[0].sprint_name
                console.log('sprint: ', sprint);
                tempStartDate = result.rows[0].start_date;
                // req.tableData = sprint + "_data";
                // req.tableTeams = sprint + "_teams";
                next();
              }
            );
      });
});

// UPDATE TODAY'S COMMIT STATUS
router.post('/today', function(req, res) {

  // DELETES ALL ROWS
  pg.connect(connectionString, function(err, client, done) {
          ////console.log('Connecting to: ', connectionString);
          if (err) {
              res.sendStatus(500);
              //console.log("error");
          }

          // DELETE ALL COLUMNS WHERE THE DATE == TODAY'S DATE
          client.query("DELETE FROM " + sprint + "_data WHERE date=$1", [getDate()],
              function(err, result) {
                  done();
                  if (err) {
                      res.sendStatus(500);
                      //console.log('error deleting rows with today\'s date in the database')
                      //console.log('error: ', err);
                  }
                  // resets the loop going through each user in the database!
                  i = 0;
                  pg.connect(connectionString, function(err, client, done) {
                          //console.log('Connecting to: ', connectionString);
                          if (err) {
                              res.sendStatus(500);
                              //console.log("error");
                          }

                          client.query("SELECT github FROM " + sprint + "_teams",
                              function(err, result) {
                                  done();
                                  if (err) {
                                      res.sendStatus(500);
                                      //console.log('error grabbing usernames from teams table...')
                                      //console.log('error: ', err);
                                  }
                                  ////console.log(result.rows);
                                  results = result.rows;
                                  timer = setInterval(scrapeUserToday, 5000);

                                  });
                          });
                  });
          });
});

// UPDATE TODAY'S COMMIT STATUS
router.post('/yesterday', function(req, res, next) {
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
                //console.log(result.rows);
                sprint = result.rows[0].sprint_name
                console.log('sprint: ', sprint);
                tempStartDate = result.rows[0].start_date;
                // req.tableData = sprint + "_data";
                // req.tableTeams = sprint + "_teams";
                next();
              }
            );
      });
});


<<<<<<< HEAD
router.post('/yesterday', function(req, res) {
=======
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
            //console.log(status);
>>>>>>> 0c6fe2d2223c538a434a414bf581fe8b3980c233

  // DELETES ALL ROWS
  pg.connect(connectionString, function(err, client, done) {
          //console.log('Connecting to: ', connectionString);
          if (err) {
              res.sendStatus(500);
              console.log("error");
          }

          // DELETE ALL COLUMNS WHERE THE DATE == TODAY'S DATE
          client.query("DELETE FROM " + sprint + "_data WHERE date=$1", [getYesterdaysDate()],
              function(err, result) {
                  done();
                  if (err) {
                      res.sendStatus(500);
                      console.log('error deleting rows with today\'s date in the database')
                      console.log('error: ', err);
                  }
                  // resets the loop going through each user in the database!
                  i = 0;
                  pg.connect(connectionString, function(err, client, done) {
                          console.log('Connecting to: ', connectionString);
                          if (err) {
                              res.sendStatus(500);
                              console.log("error");
                          }

                          client.query("SELECT github FROM " + sprint + "_teams",
                              function(err, result) {
                                  done();
                                  if (err) {
                                      res.sendStatus(500);
                                      console.log('error grabbing usernames from teams table...')
                                      console.log('error: ', err);
                                  }
                                  //console.log(result.rows);
                                  results = result.rows;
                                  timer = setInterval(scrapeUserYesterday, 5000);

                                  });
                          });
                  });
          });
});

<<<<<<< HEAD
// UPDATE TODAY'S COMMIT STATUS
router.post('/sprint', function(req, res, next) {
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
=======
            pg.connect(connectionString, function(err, client, done) {
                //console.log('Connecting to: ', connectionString);
                if (err) {
                    res.sendStatus(500);
                    //console.log("error");
>>>>>>> 0c6fe2d2223c538a434a414bf581fe8b3980c233
                }
                //console.log(result.rows);
                sprint = result.rows[0].sprint_name
                console.log('sprint: ', sprint);
                tempStartDate = result.rows[0].start_date;
                // req.tableData = sprint + "_data";
                // req.tableTeams = sprint + "_teams";
                next();
              }
            );
      });
});


<<<<<<< HEAD
router.post('/sprint', function(req, res) {
  tempSprintDates = getSprintDates('2016-08-23');

  // DELETES ALL ROWS
  pg.connect(connectionString, function(err, client, done) {
          //console.log('Connecting to: ', connectionString);
          if (err) {
              res.sendStatus(500);
              console.log("error");
          }

          // DELETE ALL COLUMNS WHERE THE DATE == TODAY'S DATE
          client.query("DELETE FROM " + sprint + "_data WHERE date IN ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30)",
          [tempSprintDates[0],
          tempSprintDates[1],
          tempSprintDates[2],
          tempSprintDates[3],
          tempSprintDates[4],
          tempSprintDates[5],
          tempSprintDates[6],
          tempSprintDates[7],
          tempSprintDates[8],
          tempSprintDates[9],
          tempSprintDates[10],
          tempSprintDates[11],
          tempSprintDates[12],
          tempSprintDates[13],
          tempSprintDates[14],
          tempSprintDates[15],
          tempSprintDates[16],
          tempSprintDates[17],
          tempSprintDates[18],
          tempSprintDates[19],
          tempSprintDates[20],
          tempSprintDates[21],
          tempSprintDates[22],
          tempSprintDates[23],
          tempSprintDates[24],
          tempSprintDates[25],
          tempSprintDates[26],
          tempSprintDates[27],
          tempSprintDates[28],
          tempSprintDates[29]],
              function(err, result) {
                  done();
                  if (err) {
                      res.sendStatus(500);
                      console.log('error deleting rows with corresponding sprint dates in the database')
                      console.log('error: ', err);
                  }
                  // resets the loop going through each user in the database!
                  i = 0;
                  pg.connect(connectionString, function(err, client, done) {
                          console.log('Connecting to: ', connectionString);
                          if (err) {
                              res.sendStatus(500);
                              console.log("error");
                          }

                          client.query("SELECT github FROM " + sprint + "_teams",
                              function(err, result) {
                                  done();
                                  if (err) {
                                      res.sendStatus(500);
                                      console.log('error grabbing usernames from teams table...')
                                      console.log('error: ', err);
                                  }
                                  //console.log(result.rows);
                                  results = result.rows;
                                  timer = setInterval(scrapeUserSprint, 5000);

                                  });
                          });
                  });
          });
=======
                client.query("INSERT INTO sprint3 (github, date, commits) VALUES ($1, $2, $3)", [githubUname, foundObject.date, foundObject.data],
                    function(err, result) {
                        done();
                        if (err) {
                            res.sendStatus(500);
                            //console.log('error: ', err);
                        }

                        //console.log('');
                        res.send(result.rows)
                    })
            })
        })
        .then(content => {
            sitepage.close();
            phInstance.exit();
        })
        .catch(error => {
            //console.log(error);
            phInstance.exit()
        })
>>>>>>> 0c6fe2d2223c538a434a414bf581fe8b3980c233
});

// GET ENTIRE SPRINT COMMITS!
// router.post('/sprint/:uname', function(req, res) {
//     var githubUname = uname;
//     var swagArray = [];
//     var sitepage = null;
//     var phInstance = null;
//
//     phantom.create()
//         .then(instance => {
//             phInstance = instance;
//             return instance.createPage();
//         })
//         .then(page => {
//             sitepage = page;
//             return page.open('https://github.com/users/' + githubUname + '/contributions');
//         })
//         .then(status => {
//             console.log(status);
//
//             return sitepage.property('content');
//         })
//         .then(content => {
//             swagArray = content.split('\n');
//
//             var tempArray = [];
//             swagArray.forEach(function(line) {
//                 if (line.substring(11, 14) == "rec") {
//                     var templine = line.substring(84);
//                     var templine2 = ""
//                     if (templine[0] == 'c') {
//                         templine = templine.substring(1);
//                     } else if (templine[0] == '-') {
//                         templine = templine.substring(2);
//                     } else if (templine[0] == 'a') {
//                         templine = templine.substring(3);
//                     }
//
//                     templine = templine.substring(6); // commits
//                     templine2 = templine.substring(14, 24); // date
//                     templine = templine[0];
//                     tempArray.push({
//                         data: templine,
//                         date: templine2
//                     });
//                 }
//             });
//
//             // finds the data matching today's date!
//             var foundObject = tempArray.find(findTodayObject);
//
//             pg.connect(connectionString, function(err, client, done) {
//                 console.log('Connecting to: ', connectionString);
//                 if (err) {
//                     res.sendStatus(500);
//                     console.log("error");
//                 }
//
//                 var user = req.body;
//
//                 client.query("INSERT INTO sprint3 (github, date, commits) VALUES ($1, $2, $3)", [githubUname, foundObject.date, foundObject.data],
//                     function(err, result) {
//                         done();
//                         if (err) {
//                             res.sendStatus(500);
//                             console.log('error: ', err);
//                         }
//
//                         console.log('');
//                         res.send(result.rows)
//                     })
//             })
//         })
//         .then(content => {
//             sitepage.close();
//             phInstance.exit();
//         })
//         .catch(error => {
//             console.log(error);
//             phInstance.exit()
//         })
// });

// GET ENTIRE LAWN COMMITS!
router.put('/lawn/update', function(req, res) {
    //console.log('THE REQ BOY', req.body);
    var uname = req.body.github_url;
    var githubUname = uname.substring(19);
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
            //console.log(status);

            return sitepage.property('content');
        })
        .then(content => {
            swagArray = content.split('\n');

            var tempArray = [];
            swagArray.forEach(function(line) {
                if (line.substring(11, 14) == "rec") {
                    var templine = line.substring(84);
                    var templine2 = ""
                    if (templine[0] == 'c') {
                        templine = templine.substring(1);
                    } else if (templine[0] == '-') {
                        templine = templine.substring(2);
                    } else if (templine[0] == 'a') {
                        templine = templine.substring(3);
                    }

                    templine = templine.substring(6); // commits
                    templine2 = templine.substring(14, 24); // date
                    templine = templine[0];
                    tempArray.push({
                        data: templine,
                        date: templine2
                    });
                }
            });

            // finds the data matching today's date!
            // var foundObject = tempArray.find(findTodayObject);

            //

            pg.connect(connectionString, function(err, client, done) {
                //console.log('ITS HEREConnecting to: ', connectionString);
                if (err) {
                    res.sendStatus(500);
                    //console.log("error");
                }

                // var user = req.body;


                //console.log('LINE 428!!!!')
                client.query("DELETE FROM user_lawns WHERE github = " + "'" + githubUname + "'",
                    function(err, result) {
                        done();
                        if (err) {
                            res.sendStatus(500);
                            //console.log('error: ', err);
                        }

                        //console.log('DELETED USER LAWN DATA');
                        tempArray.forEach(function(commitObject) {



                            pg.connect(connectionString, function(err, client, done) {
                                //console.log('ADDING UPDATED USER LAWN DATA');
                                if (err) {
                                    res.sendStatus(500);
                                    //console.log("error");
                                }

                                var user = req.body;
                                var didCommit = false;
                                if (commitObject.data > 0) {
                                    didCommit = true;
                                }
                                client.query("INSERT INTO user_lawns (github, date, did_commit, commits) VALUES ($1, $2, $3, $4)", [githubUname, commitObject.date, didCommit, commitObject.data],
                                    function(err, result) {
                                        done();
                                        if (err) {
                                            res.sendStatus(500);
                                            //console.log('error: ', err);
                                        }

                                        //console.log('');
                                        // res.send(result.rows)
                                    })
                            })

                        });
                        res.send({
                            data: tempArray
                        });
                    })
            })
        })
        .then(content => {
            sitepage.close();
            phInstance.exit();
        })
        .catch(error => {
            //console.log(error);
            phInstance.exit()
        })
});

router.put('/teamname', function(req, res) {
    //console.log("req sent for username update ", req.body);
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in PUT, pg.connect", err, "\n \n \n \n");
            res.sendStatus(500);
        }

        var queryString = 'UPDATE users SET display_name = $1 WHERE id = $2';
        var refrenceValues = [req.body.newData, req.body.oldData];
        console.log("VAULE", refrenceValues);
        // res.send(201);
        client.query(queryString, refrenceValues,

            function(err, result) {
                done();
                if (err) {
                    res.sendStatus(500);
                    //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in PUT, client.query: ", err, "\n \n \n \n");
                    return;
                }
                res.sendStatus(200);

            });

    });
});


router.put('/username', function(req, res) {
    //console.log("req sent for teamname update ", req.body);
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in PUT, pg.connect", err, "\n \n \n \n");
            res.sendStatus(500);
        }

        var queryString = 'UPDATE users SET display_name = $1, email = $2 WHERE email = $3';
        var refrenceValues = [newName, newEmail, oldEmail];

        client.query(queryString, refrenceValues,

            function(err, result) {
                done();
                if (err) {
                    res.sendStatus(500);
                    //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in PUT, client.query: ", err, "\n \n \n \n");
                    return;
                }
                res.sendStatus(200);

            });
    });
});


router.put('/', function(req, res) {
    //console.log('this is the req:', req.body);
    var newEmail = req.body.email;
    var newName = req.body.name;
    var oldEmail = req.body.oldEmail;

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in PUT, pg.connect", err, "\n \n \n \n");
            res.sendStatus(500);
        }

        var queryString = 'UPDATE users SET display_name = $1, email = $2 WHERE email = $3';
        var refrenceValues = [newName, newEmail, oldEmail];

        client.query(queryString, refrenceValues,

            function(err, result) {
                done();
                if (err) {
                    res.sendStatus(500);
                    //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in PUT, client.query: ", err, "\n \n \n \n");
                    return;
                }
                res.sendStatus(200);

            });

    });
});




module.exports = router;

// FUNCTIONS!
// SCRAPE USER FUNCTION
function scrapeUserToday(){
  // function(tempObject){
  var tempObject = results[i];

    var githubUname = tempObject.github;
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
            ////console.log(status);
            return sitepage.property('content');
        })
        .then(content => {
            swagArray = content.split('\n');

            var tempArray = [];
            swagArray.forEach(function(line) {
                if (line.substring(11, 14) == "rec") {
                    var templine = line.substring(84);
                    var templine2 = ""
                    if (templine[0] == 'c') {
                        templine = templine.substring(1);
                    } else if (templine[0] == '-') {
                        templine = templine.substring(2);
                    } else if (templine[0] == 'a') {
                        templine = templine.substring(3);
                    }

                    templine = templine.substring(6); // commits
                    templine2 = templine.substring(14, 24); // date
                    templine = templine[0];
                    tempArray.push({
                        data: templine,
                        date: templine2
                    });
              }
          });

          // finds the data matching today's date!
          var foundObject = tempArray.find(findTodayObject);

          // if there is an error with phantom.js (error with the username)
          if (foundObject == undefined){
            //console.log('ERROR: the user ' + githubUname + ' has either changed their username, or deleted their account.')
          }
          // posts information into server!!
          else {
            //console.log(githubUname + ': ' + foundObject.data);

            // finds out how many commits the user made, saves as a boolean (true / false)
            var tempBoolean;
            if (foundObject.data > 0){
              tempBoolean = true;
            } else {
              tempBoolean = false;
            }

            // post commit status for found user into sprint_data table
            pg.connect(connectionString, function(err, client, done) {
                ////console.log('Connecting to: ', connectionString);
                if (err) {
                    res.sendStatus(500);
                    //console.log("error" + err);
                }

                client.query("INSERT INTO " + sprint + "_data (github, date, commits) VALUES ($1, $2, $3)", [githubUname, foundObject.date, tempBoolean],
                    function(err, result) {
                        done();
                        if (err) {
                            res.sendStatus(500);
                            //console.log('error: ', err);
                        }

                        //console.log('sucussful post into table.');
                    })
            })
          }

        }) // closes phantom session
          .then(content => {
              sitepage.close();
              phInstance.exit();
          }) // console logs error if found and closes phantom session
          .catch(error => {
              //console.log(error);
              phInstance.exit()
          })
  // Increases i by one, continues to the next username
  i++;

  // Clears interval if gone through all the results (usernames)
  if (i == results.length){
    clearInterval(timer);
    //console.log('GET TODAY complete.')
  }
}

// SCRAPE USER FUNCTION YESTERDAY
function scrapeUserYesterday(){
  var tempObject = results[i];

    var githubUname = tempObject.github;
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
            ////console.log(status);
            return sitepage.property('content');
        })
        .then(content => {
            swagArray = content.split('\n');

            var tempArray = [];
            swagArray.forEach(function(line) {
                if (line.substring(11, 14) == "rec") {
                    var templine = line.substring(84);
                    var templine2 = ""
                    if (templine[0] == 'c') {
                        templine = templine.substring(1);
                    } else if (templine[0] == '-') {
                        templine = templine.substring(2);
                    } else if (templine[0] == 'a') {
                        templine = templine.substring(3);
                    }

                    templine = templine.substring(6); // commits
                    templine2 = templine.substring(14, 24); // date
                    templine = templine[0];
                    tempArray.push({
                        data: templine,
                        date: templine2
                    });
              }
          });

          // finds the data matching today's date!
          var foundObject = tempArray.find(findYesterdayObject);

          // if there is an error with phantom.js (error with the username)
          if (foundObject == undefined){
            //console.log('ERROR: the user ' + githubUname + ' has either changed their username, or deleted their account.')
          }
          // posts information into server!!
          else {
<<<<<<< HEAD
            console.log(githubUname + ': ' + foundObject.data + ' ' + foundObject.date);
=======
            //console.log(githubUname + ': ' + foundObject.data);
>>>>>>> 0c6fe2d2223c538a434a414bf581fe8b3980c233

            // finds out how many commits the user made, saves as a boolean (true / false)
            var tempBoolean;
            if (foundObject.data > 0){
              tempBoolean = true;
            } else {
              tempBoolean = false;
            }

            // post commit status for found user into sprint_data table
            pg.connect(connectionString, function(err, client, done) {
                ////console.log('Connecting to: ', connectionString);
                if (err) {
                    res.sendStatus(500);
                    //console.log("error" + err);
                }

                client.query("INSERT INTO " + sprint + "_data (github, date, commits) VALUES ($1, $2, $3)", [githubUname, foundObject.date, tempBoolean],
                    function(err, result) {
                        done();
                        if (err) {
                            res.sendStatus(500);
                            //console.log('error: ', err);
                        }

                        //console.log('sucussful post into table.');
                    })
            })
          }

        }) // closes phantom session
          .then(content => {
              sitepage.close();
              phInstance.exit();
          }) // console logs error if found and closes phantom session
          .catch(error => {
              //console.log(error);
              phInstance.exit()
          })
  // Increases i by one, continues to the next username
  i++;

  // Clears interval if gone through all the results (usernames)
  if (i == results.length){
    clearInterval(timer);
<<<<<<< HEAD
    console.log('GET YESTERDAY complete.')
  }
}

// SCRAPE USER FUNCTION
function scrapeUserSprint(){
  // function(tempObject){
  var tempObject = results[i];

    var githubUname = tempObject.github;
    var swagArray = [];
    var sitepage = null;
    var phInstance = null;

    if (githubUname !== undefined){
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
              //console.log(status);
              return sitepage.property('content');
          })
          .then(content => {
              swagArray = content.split('\n');

              var tempArray = [];
              swagArray.forEach(function(line) {
                  if (line.substring(11, 14) == "rec") {
                      var templine = line.substring(84);
                      var templine2 = ""
                      if (templine[0] == 'c') {
                          templine = templine.substring(1);
                      } else if (templine[0] == '-') {
                          templine = templine.substring(2);
                      } else if (templine[0] == 'a') {
                          templine = templine.substring(3);
                      }

                      templine = templine.substring(6); // commits
                      templine2 = templine.substring(14, 24); // date
                      templine = templine[0];
                      tempArray.push({
                          data: templine,
                          date: templine2
                      });
                }
            });

            // finds the data matching today's date!

            var foundObjectsArray = []
            tempSprintDates.forEach(function(datee){
              var tempFoundObject = tempArray.find(function(entry){ return entry.date === datee});
              //console.log(tempFoundObject)
              foundObjectsArray.push(tempFoundObject);
            });
            foundObjectsArray.forEach(function(cat, index){
              if (cat == undefined){
                foundObjectsArray.splice(index, 1);
                console.log('there was an error with this date')
              } // else {
              //   // finds out how many commits the user made, saves as a boolean (true / false)
              //   var tempBoolean;
              //   if (cat.data > 0){
              //     tempBoolean = true;
              //   } else {
              //     tempBoolean = false;
              //   }
              //   cat.data = tempBoolean;
              // }
            });

            foundObjectsArray.forEach(function(entry){
              var tempBoolean;
              if (entry.data > 0){
                tempBoolean = true;
              } else {
                tempBoolean = false;
              }
              entry.data = tempBoolean;
            })

            foundObjectsArray.forEach(function(entry){
              console.log(typeof(entry.data));
            });

            var tempSQL = "INSERT INTO " + sprint + "_data (github, date, commits) VALUES ";

            foundObjectsArray.forEach(function(entry, index){
              if (index === 0){
                var tempString = "('" + githubUname + "', '" + entry.date + "', '" + entry.data + "')";
                tempSQL = tempSQL + tempString;
              } else {
                var tempString = ", ('" + githubUname + "', '" + entry.date + "', '" + entry.data + "')";
                tempSQL = tempSQL + tempString;
              }
            });

            //console.log('\n' + tempSQL);

            // if there is an error with phantom.js (error with the username)
            // if (foundObject == undefined){
            //   console.log('ERROR: the user ' + githubUname + ' has either changed their username, or deleted their account.')
            // }
            // posts information into server!!
            // else {
            //   console.log(githubUname + ': ' + foundObject.data);

              // post commit status for found user into sprint_data table
              pg.connect(connectionString, function(err, client, done) {
                  //console.log('Connecting to: ', connectionString);
                  if (err) {
                      res.sendStatus(500);
                      console.log("error" + err);
                  }

                  client.query(tempSQL, [],
                      function(err, result) {
                          done();
                          if (err) {
                              res.sendStatus(500);
                              console.log('error: ', err);
                          }

                          console.log('sucussful post into table.');
                      })
              })
            //}

          }) // closes phantom session
            .then(content => {
                sitepage.close();
                phInstance.exit();
            }) // console logs error if found and closes phantom session
            .catch(error => {
                console.log(error);
                phInstance.exit()
            })
        }
  // Increases i by one, continues to the next username
  i++;

  // Clears interval if gone through all the results (usernames)
  if (i == results.length){
    clearInterval(timer);
    console.log('GET ENTIRE SPRINT complete.')
=======
    //console.log('GET TODAY complete.')
>>>>>>> 0c6fe2d2223c538a434a414bf581fe8b3980c233
  }
}

// get today's date
// returns today's date in yyyy-mm-dd format.
function getDate() {
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

// get yesterday's date
// returns yesterday's date in yyyy-mm-dd format.
function getYesterdaysDate() {
    var d = new Date(getDate());
    var day = d.getDate();
    d.setDate(day - 1);
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

// get all the dates given a start date for a sprint
function getSprintDates(startDate){
  var myDate = new Date(startDate);
  var dates = [];
  for (var i = 0; i < 30; i++){
    var dayOfMonth = myDate.getDate();
    myDate.setDate(dayOfMonth + 1);

    dates.push(styleDate(myDate));
  }
  //console.log(dates);
  return dates;
}


// styles date to yyyy-mm-dd
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

// find object in tempArray with today's date
function findTodayObject(entry) {
    return entry.date === getDate();
}

function findYesterdayObject(entry) {
  return entry.date === getYesterdaysDate();
}

function findSprintObjects(startDate){
  return entry.date === x
}
