let tokenModule = require('jsonwebtoken');
let database = require('./../Helper/database');

module.exports = {
    /**
     * Verifies the validity of a token and sends the user through to the rest of the website if it is valid, token MUST have userID encoded in it, or it will not validate!
     * @param {*} req Request object from Express 
     * @param {*} res Response object for Express
     * @param {*} next Call the next middleware in line
     */
    JWT(req, res, next) {
        if(req.url == "/login" || req.url == "/register") {
            next();
        } else {
            let token = req.headers["authentication"];
            console.log(token);
            if(token != null && token != undefined && token != "") {
                console.log(token);
                tokenModule.verify(token, process.env.secret || 'devPassToken', function(err, payload) {
                    if (err) {
                        console.log(err);
                        res.status(401).end("Requires Authentication");
                    } else {
                        //Verify payload.userID with DB here, wait for DB to finish.
                        database.getStudentById(payload.userID, function(err, result) {
                            if(!err && result != null) {
                                next();
                            } else {
                                res.status(401).end("Requires Authentication");
                            }
                        });
                    }
                })
            } else {
                res.status(401).end("Requires Authentication");
            }
        }
    }
}