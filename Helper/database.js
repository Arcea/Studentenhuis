let mysql = require('./../database/connection');

module.exports = {
    getStudents: function(cb) {
        let query = "SELECT * FROM `Student`";

        executeQuery(query, cb());
    },

    getStudentById: function(id, cb) {
        let query = "SELECT * FROM `Student` WHERE `idStudenten` = ?";

        executeQueryParameterized(query, id, cb());
    },

    addStudent: function(studentInfo, cb) {
        let query = "INSERT INTO `Student` VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?);";

        executeQueryParameterized(query, studentInfo, cb());
    },

    updateStudent: function(studentInfo, cb) {
        let query = "UPDATE `Student` SET ? WHERE `Student`.`idStudenten` = ?";

        executeQueryParameterized(query, studentInfo, cb());
    },

    deleteStudent: function(id, cb) {
        let query = "DELETE FROM `Student` WHERE `idStudenten` = ?";

        executeQueryParameterized(query, id, cb());
    },

    getMeals: function(cb) {
        let query = "SELECT * FROM `Maaltijd`";

        executeQuery(query, cb());
    },

    getMealById: function(id, cb) {
        let query = "SELECT * FROM `Maaltijd` WHERE `idMaaltijd` = ?";

        executeQueryParameterized(query, id, cb());
    },

    addMeal: function(mealDetails, cb) {
        let query = "INSERT INTO `Maaltijd` VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)";

        executeQueryParameterized(query, mealDetails, cb());
    },

    updateMeal: function(mealDetails, cb) {
        let query = "UPDATE `Maaltijd` SET ? WHERE `maaltijd`.`idMaaltijd` = ?";

        executeQueryParameterized(query, mealDetails, cb());
    },

    deleteMeal: function(id, cb) {
        let query = "DELETE FROM `Maaltijd` WHERE `idMaaltijd` = ?";

        executeQueryParameterized(query, id, cb());
    },

    getMeeEters: function(id, cb) {
        let query = "SELECT * FROM `studentmaaltijd` WHERE `idMaaltijd` = ?";

        executeQueryParameterized(query, id, cb());
    }
}

function executeQuery(query, cb) {
    mysql.connection(function(err, connection) {
        if(err){
            cb(err);
        } else {
            connection.query(query, function(err, rows, fields) {
                if(err) {
                    cb(err, null);
                } else {
                    cb(null, rows);
                }
            });
        }      
    });
}

function executeQueryParameterized(query, params, cb) {
    mysql.connection(function(err, connection) {
        if(err) {
            cb(err);
        } else {
            connection.query(query, params, function(err, rows, fields) {
                if(err) {
                    cb(err, null);
                } else {
                    cb(null, rows);
                }
            });
        }
    });
}