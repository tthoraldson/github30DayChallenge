var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/github_challenge';
var phantom = require('phantom');

router.get('/', function(req, res) {

    console.log("The database name: ", req.query.db);

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

                console.log('GET REQ: grabbing form data from db')
                res.send(result.rows)
            })


    });
});

router.post('/', function(req, res) {
    // console.log('FORM', req.body);
    // console.log('res', res.body);
    console.log('\nTITLE: ', req.body.title);
    console.log('\nDESC: ', req.body.description);
    console.log('\nQUESTIONS: ', req.body.questions);



    //INSERT INTO FORM HISTORY
    pg.connect(connectionString, function(err, client, done) {
        console.log('Start!');
        if (err) {
            res.sendStatus(500);
            console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, pg.connect", err, "\n \n \n \n");
        }

        var thequery =
            "INSERT INTO form_history (form_title, form_description, form_questions) VALUES ($1, $2, $3)";

        var jsonData = '[';
        req.body.questions.forEach(function(question, index) {
            if (question.type != 'shortAnswer') {
                var optionString = '[';
                question.options.forEach(function(option, index) {
                optionString += '{"check": false, "title": "'+option.option+'"}'
                if (index != question.options.length - 1){
                  optionString += ','
                }

                });
                optionString += ']'
            } else {optionString = '[]'};

            console.log('OPTION STRING', optionString);
            jsonData += '{"title":"' + question.title + '", "desc":"' + question.desc + '", "type":"' + question.type + '", "options":' + optionString + '}'
            if (index != req.body.questions.length - 1){
              jsonData += ','
            }
        });
        jsonData += ']';

        console.log('JSON DATA: ', jsonData);
        client.query(thequery, [req.body.title, req.body.description, jsonData],
            function(err, result) {
                done(); //closes connection, I only can have ten :
                if (err) {
                    res.sendStatus(500);
                    console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, client.query: ", err, "\n \n \n \n");
                    return;
                }
                // console.log('result: ', result.rows);
                console.log(result);
                console.log('POST COMPLETE: INSERTED NEW FORM TO DB')
                res.sendStatus(201);
            })


    });

})

router.put('/', function(req,res){

  console.log("UPDATING activeSurvey to survey.id: ", req.body);



    pg.connect(connectionString, function(err, client, done) {
        console.log('Start!');
        if (err) {
            res.sendStatus(500);
            console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, pg.connect", err, "\n \n \n \n");
        }


        var thequery =
            "UPDATE admin SET currentSurvey = $1 WHERE id = $2"

        client.query(thequery, [req.body.id, 0],
            function(err, result) {
                done(); //closes connection, I only can have ten :
                if (err) {
                    res.sendStatus(500);
                    console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, client.query: ", err, "\n \n \n \n");
                    return;
                }
                // console.log('result: ', result.rows);
                res.sendStatus(201);
                console.log('POST COMPLETE: UPDATING CURRENT SURVEY')
            })



  });


});


router.post('/entry', function(req,res){

console.log(req.body);

var columnString = ''
var expectedType = ''

req.body.form_questions.forEach(function(question, index){
  // console.log('question!', question);
  switch(question.type){
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
  if (index != req.body.form_questions.length - 1){
      columnString += 'question_' + index + ' ' + expectedType + ', '
  } else {
      columnString += 'question_' + index + ' ' + expectedType;
  }


});

// console.log('this is the column string', columnString);
pg.connect(connectionString, function(err, client, done) {
    console.log('Start!');
    if (err) {
        res.sendStatus(500);
        console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, pg.connect", err, "\n \n \n \n");
    }

    var thequery =
        "CREATE TABLE IF NOT EXISTS form"+req.body.id +"( user_id integer, " + columnString + " )";

          
            client.query(thequery,
                function(err, result) {
                    done(); //closes connection, I only can have ten :
                    if (err) {
                        res.sendStatus(500);
                        console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, client.query: ", err, "\n \n \n \n");
                        return;
                    }


                    req.body.form_questions.forEach(function(question, index){
                      // console.log('question!', question);
                      console.log('heyhey it chcked for table, created?, now trying to post questions -? uname?')
                      switch(question.type){
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


                    //
                    // pg.connect(connectionString, function(err, client, done) {
                    //     console.log('Start!');
                    //     if (err) {
                    //         res.sendStatus(500);
                    //         console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, pg.connect", err, "\n \n \n \n");
                    //     }
                    //
                    //     var thequery =
                    //         "INSERT INTO form"+req.body.id +"( " + columnString + " )";
                    //
                    //
                    //             client.query(thequery,
                    //                 function(err, result) {
                    //                     done(); //closes connection, I only can have ten :
                    //                     if (err) {
                    //                         res.sendStatus(500);
                    //                         console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, client.query: ", err, "\n \n \n \n");
                    //                         return;
                    //                     }
                    //
                    //
                    //                     console.log('INPUTED USER SURVEY VALUES')
                    //                     res.sendStatus(201);
                    //
                    //                 })
                    //
                    //
                    //
                    // });
                  });





                })



});
});
module.exports = router;
