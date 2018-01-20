let express = require('express');
let routes = express.Router();
let encrypt = require('./Helper/encrypt');
let Meal = require('./models/meal');

routes.get('/', function (req, res) {
    res.contentType('application/json');
    res.status(200);
    res.json({'tekst' : 'Welcome to the app'})

routes.post('/register', function (req, res) {
    console.log("Reached register");
    if (req.body.name == "" || req.body.name == undefined) {
        res.json({
            status: "failed",
            error: "Name is empty or undefined"
        })
        return;
    }

    if (req.body.password == "" || req.body.password == undefined) {
        res.json({
            status: "failed",
            error: "Password is empty or undefined"
        });
        return;
    }

    if (req.body.email == "" || req.body.email == undefined) {
        res.json({
            status: "failed",
            error: "Email is empty or undefined"
        });
        return;
    }

    encrypt.hash(req.body.password, function (enc, err) {
        if (err == null) {
            req.body.password = enc;
            console.log(req.body);
            db.connection(function (err, conn) {
                if (err)
                    console.log(err);

                let query = "INSERT INTO `student` VALUES ('" + req.body.name + "', '" + req.body.email + "', '" + req.body.password + "', NULL)";
                conn.query(query, function (err, result) {
                    if (err) throw err;
                    res.json({
                        status: "success"
                    });
                });
            });
        } else {
            res.json({
                status: "failed",
                error: "Unexpected error: " + err
            });
        }
    });

});

routes.post('/login', function (req, res) {
    console.log("Reached login");
    if (req.body.password == "" || req.body.password == undefined) {
        res.json({
            status: "failed",
            error: "Password is empty or undefined"
        });
        return;
    }

    if (req.body.email == "" || req.body.email == undefined) {
        res.json({
            status: "failed",
            error: "Email is empty or undefined"
        });
        return;
    }

    let pass = req.body.password;
    db.connection(function (err, conn) {
        if (err)
            console.log(err);

        let query = "SELECT * FROM `student` WHERE email = '" + req.body.email + "'";
        conn.query(query, function (err, result) {
            if (err) throw err;

            let userPass = "";
            Object.keys(result).forEach(function (key) {
                userPass = result[key].wachtwoord;
            });

            encrypt.verifyHash(pass, userPass, function (result, err) {
                console.log(result);
                if (result) {

                    //generate JWT, until this is finished just do
                    res.json({
                        status: "success"
                    })
                } else {
                    res.json({
                        status: "failed",
                        error: "Login details are incorrect"
                    });
                }
            });
        })
    });


});

//Maaltijd
routes.get('/maaltijd', function(req, res) {
    Meal.getMeals(function(err, items) {
        if (err) {
            res.contentType('application/json'); 
            res.status(err.status);
            res.json(err.error);
        }

        else {
            res.contentType('application/json'); 
            res.status(items.length > 0 ? 200 : 404);
            res.json(items);
        }
    });
});

routes.post('/maaltijd', function(req, res) {
    Meal.addMeal(req.body, function(err, items) {
        if (err) {
            res.contentType('application/json'); 
            res.status(err.status);
            res.json(err.error);
        }

        else {
            res.contentType('application/json'); 
            res.status(items.length > 0 ? 200 : 404);
            res.json(items);
        }
    });
});

routes.get('/maaltijd/:id', function(req, res) {
    Meal.getMeal(req.params.id, function(err, items) {
        if (err) {
            res.contentType('application/json'); 
            res.status(err.status);
            res.json(err.error);
        }

        else {
            res.contentType('application/json'); 
            res.status(items.length > 0 ? 200 : 404);
            res.json(items);
        }
    });
});

routes.put('/maaltijd/:id', function(req, res) {
    Meal.updateMeal(req.params.id, req.body, function(err, items) {
        if (err) {
            res.contentType('application/json'); 
            res.status(err.status);
            res.json(err.error);
        }

        else {
            res.contentType('application/json'); 
            res.status(items.length > 0 ? 200 : 404);
            res.json(items);
        }
    });
});

routes.delete('/maaltijd/:id', function(req, res) {
    Meal.deleteMeal(req.params.id, function(err, items) {
        if (err) {
            res.contentType('application/json'); 
            res.status(err.status);
            res.json(err.error);
        }

        else {
            res.contentType('application/json'); 
            res.status(items.length > 0 ? 200 : 404);
            res.json(items);
        }
    });
});

module.exports = routes;