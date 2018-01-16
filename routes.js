let express = require('express');
let routes = express.Router();
let encrypt = require('./Helper/encrypt');
let db = require('./database/connection.js');

routes.get('/', function (req, res) {
    res.contentType('application/json');
    res.status(200);
    res.json({ 'tekst': 'Welcome to the app' })
});

routes.post('/register', function (req, res) {
    console.log("Reached register");
    if (req.body.name == "" || req.body.name == undefined) {
        res.json({
            status: "Failed",
            error: "Name is empty or undefined"
        });
        return;
    }

    if (req.body.password == "" || req.body.password == undefined) {
        res.json({
            status: "Failed",
            error: "Password is empty or undefined"
        });
        return;
    }

    if (req.body.email == "" || req.body.email == undefined) {
        res.json({
            status: "Failed",
            error: "Email is empty or undefined"
        });
        return;
    }

    //Implement insert into db
    encrypt.hash(req.body.password, function (enc, err) {
        if (err == null) {
            req.body.password = enc;
            console.log(req.body);
            db.connection(function (err, conn) {
                if (err)
                    console.log(err);

                let query = "INSERT INTO `studenten` VALUES ('" + req.body.name + "', '" + req.body.email + "', '" + req.body.password + "', NULL)";
                conn.query(query, function (err, result) {
                    if (err) throw err;
                    res.json({
                        status: "success"
                    });
                });
            });
        } else {
            res.json({
                status: "Failed",
                error: "idk yet"
            });
        }
    });

});

routes.post('/login', function (req, res) {
    console.log("Reached login");
    if (req.body.password == "" || req.body.password == undefined) {
        res.json({
            status: "Failed",
            error: "Password is empty or undefined"
        });
        return;
    }

    if (req.body.email == "" || req.body.email == undefined) {
        res.json({
            status: "Failed",
            error: "Email is empty or undefined"
        });
        return;
    }

    encrypt.verifyHash(req.body.password, function (result, err) {
        if (err == null) {
            //check with db for pass
            //generate JWT
        } else {
            res.json({
                status: "Failed",
                error: "Login details incorrect"
            });
        }
    });
});

module.exports = routes;