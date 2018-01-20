var mysql = require('../database/connection');
let encrypt = require('../Helper/encrypt');
var Account = function () { }

Account.register = function (obj, cb) {
    mysql.connection(function (err, conn) {
        if (err)
            console.log(err);

        let query = "INSERT INTO `student` VALUES ('" + obj.name + "', '" + obj.email + "', '" + obj.password + "')";
        conn.query(query, function (err, result) {
            if (err) throw err;

            cb({
                status: "success"
            });
        });
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
            Object.keys(result).forEach(function (key) {
                userPass = result[key].wachtwoord;
            });

            encrypt.verifyHash(obj.password, userPass, function (result, err) {
                console.log(result);
                if (result) {

                    //generate JWT, until this is finished just do
                    cb({
                        status: "success"
                    })
                } else {
                    cb({
                        status: "failed",
                        error: "Login details are incorrect"
                    });
                }
            });
        })
    });
}

module.exports = Account;