var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/github_challenge';

router.get('/', function(req, res) {


    pg.connect(connectionString, function(err, client, done) {
        console.log('Start!');
        if (err) {
            res.sendStatus(500);
            console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
        }

        var thequery =
            "SELECT * FROM users";


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


// POST USER URL AND OTHER FIREBAUSE AUTH INFORMATION ON FIRST TIME LOGGIN 
router.post('/', function(req, res) {
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

module.exports = router;
