let express = require('express');
let routes = express.Router();
let Meal = require('./models/meal');
let Student = require('./models/student');
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

// Maaltijd endpoints
routes.get('/maaltijd', Meal.getMeals);
routes.get('/maaltijd/:id', Meal.getMealById);
routes.post('/maaltijd', Meal.addMeal);
routes.put('/maaltijd/:id', Meal.updateMeal);
routes.delete('/maaltijd/:id', Meal.deleteMeal);

// Student endpoints
routes.get('/student', Student.getStudents);
routes.get('/student/:id', Student.getStudentById);
routes.post('/student', Student.addStudent);
routes.put('/student/:id', Student.updateStudent);
routes.delete('/student/:id', Student.deleteStudent);

// StudentMaaltijd endpoints
routes.post('/maaltijd/:id/add-student', Meal.addStudent);
routes.get('/maaltijd/:id/mee-eters', Meal.getMeeEters);

module.exports = routes;