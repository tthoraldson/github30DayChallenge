var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/github_challenge';
var phantom = require('phantom');

router.get('/', function(req, res) {

    //console.log("The database name: ", req.query.db);

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

                //console.log('GET REQ: grabbing form data from db')
                res.send(result.rows)
            })


    });
});

router.post('/', function(req, res) {
    // //console.log('FORM', req.body);
    // //console.log('res', res.body);
    //console.log('\nTITLE: ', req.body.title);
    //console.log('\nDESC: ', req.body.description);
    //console.log('\nQUESTIONS: ', req.body.questions);



    //INSERT INTO FORM HISTORY
    pg.connect(connectionString, function(err, client, done) {
        //console.log('Start!');
        if (err) {
            res.sendStatus(500);
            //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, pg.connect", err, "\n \n \n \n");
        }

        var thequery =
            "INSERT INTO form_history (form_title, form_description, form_questions) VALUES ($1, $2, $3)";

        var jsonData = '[';
        req.body.questions.forEach(function(question, index) {
            if (question.type != 'shortAnswer') {
                var optionString = '[';
                question.options.forEach(function(option, index) {
                    optionString += '{"check": false, "title": "' + option.option + '"}'
                    if (index != question.options.length - 1) {
                        optionString += ','
                    }

                });
                optionString += ']'
            } else {
                optionString = '[]'
            };

            //console.log('OPTION STRING', optionString);
            jsonData += '{"title":"' + question.title + '", "desc":"' + question.desc + '", "type":"' + question.type + '", "options":' + optionString + '}'
            if (index != req.body.questions.length - 1) {
                jsonData += ','
            }
        });
        jsonData += ']';

        //console.log('JSON DATA: ', jsonData);
        client.query(thequery, [req.body.title, req.body.description, jsonData],
            function(err, result) {
                done(); //closes connection, I only can have ten :
                if (err) {
                    res.sendStatus(500);
                    //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, client.query: ", err, "\n \n \n \n");
                    return;
                }
                // //console.log('result: ', result.rows);
                //console.log(result);
                //console.log('POST COMPLETE: INSERTED NEW FORM TO DB')
                res.sendStatus(201);
            })


    });

})

router.put('/', function(req, res) {

    console.log("UPDATING activeSurvey to survey.id: ", req.body);



    pg.connect(connectionString, function(err, client, done) {
        //console.log('Start!');
        if (err) {
            res.sendStatus(500);
            //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, pg.connect", err, "\n \n \n \n");
        }


        var thequery =
            "UPDATE admin SET currentSurvey = $1 WHERE id = $2"

        client.query(thequery, [req.body.id, 0],
            function(err, result) {
                done(); //closes connection, I only can have ten :
                if (err) {
                    res.sendStatus(500);
                    //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, client.query: ", err, "\n \n \n \n");
                    return;
                }
                // //console.log('result: ', result.rows);
                res.sendStatus(201);
                //console.log('POST COMPLETE: UPDATING CURRENT SURVEY')
            })



    });


});


router.post('/entry', function(req, res) {

    //console.log(req.body);

    var user = req.body.uname;
    var columnString = ''
    var expectedType = ''

    req.body.survey.form_questions.forEach(function(question, index) {
        // //console.log('question!', question);
        switch (question.type) {
            case 'multipleChoice':
                expectedType = 'varchar(100)';
                break;
            case 'checkbox':
                expectedType = 'varchar(100)'
                break;
            case 'shortAnswer':
                expectedType = 'varchar(500)'
                break;
        }
        if (index != req.body.survey.form_questions.length - 1) {
            columnString += 'question_' + index + ' ' + expectedType + ', '
        } else {
            columnString += 'question_' + index + ' ' + expectedType;
        }


    });


    // //console.log('this is the column string', columnString);
    pg.connect(connectionString, function(err, client, done) {
        //console.log('Start!');
        if (err) {
            res.sendStatus(500);
            //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, pg.connect", err, "\n \n \n \n");
        }

        var thequery =
            "CREATE TABLE IF NOT EXISTS form" + req.body.survey.id + "( user_email varchar(50), " + columnString + " )";


        client.query(thequery,
            function(err, result) {
                done(); //closes connection, I only can have ten :
                if (err) {
                    res.sendStatus(500);
                    //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, client.query: ", err, "\n \n \n \n");
                    return;
                }

                var answerArray = [req.body.uname.email]
                var inputIntoColumn = ''
                var valueString = ''

                req.body.survey.form_questions.forEach(function(question, index) {
                    // //console.log('question!', question);
                    //console.log('heyhey it chcked for table, created?, now trying to post questions -? uname?')
                    inputIntoColumn += 'question_' + index;
                    if (index < req.body.survey.form_questions.length - 1) {
                        inputIntoColumn += ','
                    }

                    switch (question.type) {
                        case 'multipleChoice':
                            question.options.forEach(function(option, i) {
                                if (option.check == true) {
                                    answerArray.push(i)
                                }
                            });

                            break;
                        case 'checkbox':
                            var tempString = ''
                            question.options.forEach(function(option, i) {
                                if (option.check == true) {
                                    tempString += '1'
                                } else {
                                    tempString += '0'
                                }
                            });
                            answerArray.push(tempString)


                            break;
                        case 'shortAnswer':
                            answerArray.push(question.shortAnswer);
                            break;
                    }
                    valueString += '$' + (index + 2);
                    if (index < req.body.survey.form_questions.length - 1) {
                        valueString += ','
                    }


                });

                //console.log('ANSWER ARRAY!!!!', answerArray);
                //console.log('VALUEEE STRINGGG!', valueString);
                //console.log('inputIntoColumn?', inputIntoColumn);

                pg.connect(connectionString, function(err, client, done) {
                    //console.log('Start!22');
                    if (err) {
                        res.sendStatus(500);
                        //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, pg.connect", err, "\n \n \n \n");
                    }

                    var thequery2 =
                        "INSERT INTO form" + req.body.survey.id + " (user_email, " + inputIntoColumn + ") VALUES ( $1, " + valueString + ")";

                    //console.log(thequery2);


                    client.query(thequery2, answerArray,
                        function(err, result) {
                            done(); //closes connection, I only can have ten :
                            if (err) {
                                res.sendStatus(500);
                                //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, client.query: ", err, "\n \n \n \n");
                                return;
                            }


                            //console.log('INPUTED USER SURVEY VALUES')
                            res.sendStatus(201);

                        })



                });






            })



    });
});


router.get('/results', function(req, res) {
    var results = [];
    req.query.formIDs.forEach(function(formID, index) {
      var tempArray = [];
      console.log('tempArray = ', tempArray);
      pg.connect(connectionString, function(err, client, done) {
          //console.log('Start!');
          if (err) {
              res.sendStatus(500);
              //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
          }

          var thequery =
              "SELECT * FROM " + 'form'+formID;
              console.log('Selecting all from Form',formID);

          client.query(thequery,
              function(err, result) {
                  done(); //closes connection, I only can have ten :
                  if (err) {
                      res.sendStatus(500);
                      //console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, client.query: ", err, "\n \n \n \n");
                      return;
                  }
                  // //console.log('result: ', result.rows);

                  //console.log('GET REQ: grabbing form data from db')
                  //console.log('IS THIS WORKINGGG!@?#!@?#?')
                  // console.log('pushing', {form: formID, results: result.rows});

                  // tempArray.push()
                  results.push({form: formID, results: result.rows});
                  // results.push(tempArray);
                  if(index == req.query.formIDs.length - 1){
                    res.send(results);
                    console.log('sent results AT THE END OF STHIASDFAS');
                  }
              });

      });

    });




});



module.exports = router;
