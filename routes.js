let express = require('express');
let routes = express.Router();
let encrypt = require('./Helper/encrypt');

routes.get('/', function(req, res){
    res.contentType('application/json');
    res.status(200);
    res.json({'tekst' : 'Welcome to the app'})

routes.post('/register', function (req, res) {
    console.log("Reached register");
    if (req.body.name == "" || req.body.name == undefined) {
        res.json({
            error: "Name is empty or undefined"
        });
        return;
    }

    if (req.body.password == "" || req.body.password == undefined) {
        res.json({
            error: "Password is empty or undefined"
        });
        return;
    }

    if (req.body.email == "" || req.body.email == undefined) {
        res.json({
            error: "Email is empty or undefined"
        });
        return;
    }

    //Implement insert into db
    encrypt.hash(req.body.password, function (enc, err) {
        if (err == null) {
            req.body.password = enc;
            console.log(req.body);
        } else {
            res.json({
                error: "idk yet"
            });
        }
    });

});

routes.post('/login', function (req, res) {
    console.log("Reached login");
    if (req.body.password == "" || req.body.password == undefined) {
        res.json({
            error: "Password is empty or undefined"
        });
        return;
    }

    if (req.body.email == "" || req.body.email == undefined) {
        res.json({
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
                error: "Login details incorrect"
            });
        }
    });
});

module.exports = routes;