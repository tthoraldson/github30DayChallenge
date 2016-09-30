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
  // INSERT INTO QUESTIONS TABLE
  console.log("put request: ", req.body);
  req.body.questions.forEach(function(question){

    pg.connect(connectionString, function(err, client, done) {
        console.log('Start!');
        if (err) {
            res.sendStatus(500);
            console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, pg.connect", err, "\n \n \n \n");
        }


        var thequery =
            "INSERT INTO users (id, github_url, email, display_name, authToken, user_id, profile_photo, auth_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"

        client.query(thequery, [req.body.title, req.body.description],
            function(err, result) {
                done(); //closes connection, I only can have ten :
                if (err) {
                    res.sendStatus(500);
                    console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, client.query: ", err, "\n \n \n \n");
                    return;
                }
                // console.log('result: ', result.rows);

                console.log('POST COMPLETE: INSERTED NEW USERS DATA TO DB')
            })



  });

  });
});

module.exports = router;
