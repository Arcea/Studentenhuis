var mysql = require('../database/connection');
let encrypt = require('../Helper/encrypt');
let JWT = require('jsonwebtoken');
let student = require('../models/student');
var Account = function () { }

Account.register = function (obj, cb) {
    encrypt.hash(obj.password, function (enc, err) {
        if (err == null) {
            obj.password = enc;
            student.addStudent([obj.name, obj.email, obj.password], function (err, result) {
                if (err) {
                    cb({
                        status: "failed",
                        error: "Unexpected error: " + err
                    });
                } else {
                    cb({
                        status: "success"
                    });
                }
            });
        } else {
            cb({
                status: "failed",
                error: "Unexpected error: " + err
            });
        }
    });
}

Account.login = function (obj, cb) {
    mysql.connection(function (err, conn) {
        if (err)
            console.log(err);

        let query = "SELECT * FROM `student` WHERE email = '" + obj.email + "'";
        conn.query(query, function (err, result) {
            if (err) throw err;

            let userPass = "";
            let id = "";
            Object.keys(result).forEach(function (key) {
                id = result[key].idStudenten;
                userPass = result[key].wachtwoord;
            });

            encrypt.verifyHash(obj.password, userPass, function (result, err) {
                console.log(result);
                if (result) {

                    let token = JWT.sign({
                        userID: id
                    }, process.env.secret || 'devPassToken');
                    cb({
                        status: "success",
                        token: token
                    })
                } else {
                    cb({
                        status: "failed",
                        error: "Login details are incorrect"
                    });
                }
            });
        });
        conn.end();
    });
}

module.exports = Account;