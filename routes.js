let express = require('express');
let routes = express.Router();

routes.post('/register', function (req, res) {
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
});

routes.post('/login', function (req, res) {

});

module.exports = routes;