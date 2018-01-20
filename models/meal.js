var mysql = require('../database/connection');
var Meal = function () { }

//Ophalen van alle maaltijden
Meal.getMeals = function (callback) {
    var query = "SELECT * FROM `Maaltijd`";

    mysql.connection(function (err, conn) {
        if (err) {
            return callback({ "status": 500, "error": err }, null);
        }

        conn.query(query, function (err, rows) {
            if (err) {
                return callback({ "status": 500, "error": err }, null);
            }

            conn.release();
            return callback(null, rows);
        })
    })
};

//Ophalen van 1 maaltijd
Meal.getMeal = function (id, callback) {
    var query = "SELECT * FROM `Maaltijd` WHERE `idMaaltijd` = ?";
    var objArray = [id];

    mysql.connection(function (err, conn) {
        if (err) {
            return callback({ "status": 500, "error": err }, null);
        }

        conn.query(query, objArray, function (err, rows) {
            if (err) {
                return callback({ "status": 500, "error": err }, null);
            }

            conn.release();
            return callback(null, rows);
        })
    })
};

//Toevoegen van een maaltijd
Meal.addMeal = function (obj, callback) {
    var query = "INSERT INTO `Maaltijd` VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)";
    var objArray = [
        obj.idKok,
        obj.naamMaaltijd,
        obj.maaltijdAfbeelding,
        obj.maxEters,
        obj.maaltijdBeginTijd,
        obj.maaltijdEindTijd,
        obj.kosten,
        obj.beschrijving
    ];

    if (!obj.idKok || !obj.naamMaaltijd || !obj.maxEters || !obj.maaltijdBeginTijd || !obj.maaltijdEindTijd || !obj.kosten) {
        return callback({ "status": 400, "error": "Missing properties." }, null);
    }

    mysql.connection(function (err, conn) {
        if (err) {
            return callback({ "status": 500, "error": err }, null);
        }

        conn.query(query, objArray, function (err, rows) {
            if (err) {
                return callback({ "status": 500, "error": err }, null);
            }

            return callback(null, "Item inserted at id " + rows.insertId + ".");
        });
    })
};

//Bijwerken van een maaltijd
Meal.updateMeal = function (id, obj, callback) {
    var query = "UPDATE `Maaltijd` SET ? WHERE `maaltijd`.`idMaaltijd` = ?";
    var objArray = [
        {
            "idKok": obj.idKok,
            "naamMaaltijd": obj.naamMaaltijd,
            "maaltijdAfbeelding": obj.maaltijdAfbeelding,
            "maxEters": obj.maxEters,
            "maaltijdBeginTijd": obj.maaltijdBeginTijd,
            "maaltijdEindTijd": obj.maaltijdEindTijd,
            "kosten": obj.kosten,
            "beschrijving": obj.beschrijving
        },
        id
    ];

    if (!obj.idKok || !obj.naamMaaltijd || !obj.maxEters || !obj.maaltijdBeginTijd || !obj.maaltijdEindTijd || !obj.kosten) {
        return callback({ "status": 400, "error": "Missing properties." }, null);
    }

    mysql.connection(function (err, conn) {
        if (err) {
            return callback({ "status": 500, "error": err }, null);
        }

        conn.query(query, objArray, function (err, rows) {
            if (err) {
                return callback({ "status": 500, "error": err }, null);
            }

            return callback(null, (rows.affectedRows > 0 ? "Item at id " + id + " updated." : "No object to update."));
        });
    })
};

//Verwijderen van een maaltijd
Meal.deleteMeal = function (id, callback) {
    var query = "DELETE FROM `Maaltijd` WHERE `idMaaltijd` = ?";
    var objArray = [id];

    mysql.connection(function (err, conn) {
        if (err) {
            return callback({ "status": 500, "error": err }, null);
        }

        conn.query(query, objArray, function (err, rows) {
            if (err) {
                return callback({ "status": 500, "error": err }, null);
            }

            return callback(null, (rows.affectedRows > 0 ? "Item at id " + id + " removed." : "No object to remove."));
        });
    })
};


module.exports = Meal;