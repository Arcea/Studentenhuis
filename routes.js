let express = require('express');
let routes = express.Router();
let Meal = require('./models/meal');
let Account = require('./models/account');

routes.get('/', function (req, res) {
    res.contentType('application/json');
    res.status(200);
    res.json({ 'tekst': 'Welcome to the app' })
});

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
            let obj = {};
            obj.password = enc;
            obj.name = req.body.name;
            obj.email = req.body.email;

            Account.register(obj, function (result) {
                res.json(result);
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

    let obj = {};
    obj.email = req.body.email;
    obj.password = req.body.password;

    Account.login(obj, function (result) {
        res.json(result);
    });
});

//Maaltijd
routes.get('/maaltijd', function (req, res) {
    Meal.getMeals(function (err, items) {
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

routes.post('/maaltijd', function (req, res) {
    Meal.addMeal(req.body, function (err, items) {
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

routes.get('/maaltijd/:id', function (req, res) {
    Meal.getMeal(req.params.id, function (err, items) {
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

routes.put('/maaltijd/:id', function (req, res) {
    Meal.updateMeal(req.params.id, req.body, function (err, items) {
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

routes.delete('/maaltijd/:id', function (req, res) {
    Meal.deleteMeal(req.params.id, function (err, items) {
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