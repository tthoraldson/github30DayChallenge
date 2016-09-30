var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/github_challenge';
var phantom = require('phantom');

router.get('/', function(req, res) {

    // console.log("The database name: ", req.query);

    pg.connect(connectionString, function(err, client, done) {
        console.log('Start!');
        if (err) {
            res.sendStatus(500);
            console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
        }

        var thequery =
            "SELECT * FROM " + "form_history";


        client.query(thequery,
            function(err, result) {
                done(); //closes connection, I only can have ten :
                if (err) {
                    res.sendStatus(500);
                    console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, client.query: ", err, "\n \n \n \n");
                    return;
                }
                // console.log('result: ', result.rows);

                console.log('GET REQ: grabbing task list from db')
                res.send(result.rows)
            })


    });
});

router.post('/', function(req, res){
  // console.log('FORM', req.body);
  // console.log('res', res.body);
  console.log('\nTITLE: ', req.body.title);
  console.log('\nDESC: ', req.body.description);
  console.log('\nQUESTIONS: ',req.body.questions);

  res.sendStatus(201)
})

module.exports = router;
