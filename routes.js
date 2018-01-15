let express = require('express');
let routes = express.Router();

//Wachten tot de db gedaan is.

routes.post('/register', function (req, res) {
    console.log("Reached register");
    console.log(req.body);
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

//Wachten tot er een manier is om met de db te chekken & JWT af is.
routes.post('/login', function (req, res) {

});

module.exports = routes;