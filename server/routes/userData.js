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

router.post('/', function(req, res) {


    // pg.connect(connectionString, function(err, client, done) {
    //     console.log('Start!');
    //     if (err) {
    //         res.sendStatus(500);
    //         console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, pg.connect", err, "\n \n \n \n");
    //     }
    //
    //     var user = req.body;
    //     var thequery =
    //         "INSERT INTO users (github_url, email, display_name, authtoken, user_id, profile_photo, auth_level) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    //
    //
    //     client.query(thequery, [user.],
    //         function(err, result) {
    //             done(); //closes connection, I only can have ten :
    //             if (err) {
    //                 res.sendStatus(500);
    //                 console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in GET, client.query: ", err, "\n \n \n \n");
    //                 return;
    //             }
    //             // console.log('result: ', result.rows);
    //
    //             console.log('GET REQ: grabbing task list from db')
    //             res.send(result.rows)
    //         })
    //
    //
    // });
});

module.exports = router;
