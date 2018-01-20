var mysql = require('../database/connection');

module.exports = {
    getStudents(req, res, next) {
        var query = "SELECT * FROM `Student`";

        console.log('Student getAll');

        mysql.connection(function (error, connection) {
            if (error) {
                next(error);
            }

            connection.query(query, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: rows
                    }).end();
                };
            });
        });
    },

    getStudentById(req, res, next) {
        var query = "SELECT * FROM `Student` WHERE `idStudenten` = ?";
        var id = req.params.id;

        console.log('Student getStudentById');

        mysql.connection(function (error, connection) {
            if (error) {
                next(error);
            }

            connection.query(query, id, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: rows
                    }).end();
                };
            });
        });
    },

    addStudent(req, res, next) {
        var query = "INSERT INTO `Student` VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)";
        var params = [
            req.body.naamStudent,
            req.body.email,
            req.body.wachtwoord
        ];

        console.log('Student addStudent');

        if (!req.body.naamStudent || !req.body.email || !req.body.wachtwoord) {
            next("Missing properties.");
        }

        mysql.connection(function (error, connection) {
            if (error) {
                next(error);
            }

            connection.query(query, params, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: rows
                    }).end();
                };
            });
        });
    },

    updateStudent(req, res, next) {
        var query = "UPDATE `Student` SET ? WHERE `Student`.`idStudenten` = ?";
        var params = [
            {
                "naamStudent": req.body.naamStudent,
                "email": req.body.email,
                "wachtwoord": req.body.wachtwoord
            },
            req.params.id
        ];

        console.log('Student updateStudent');

        if (!req.body.naamStudent || !req.body.email || !req.body.wachtwoord) {
            next("Missing properties.");
        }

        mysql.connection(function (error, connection) {
            if (error) {
                next(error);
            }

            connection.query(query, params, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: rows
                    }).end();
                };
            });
        });
    },
    
    deleteStudent(req, res, next) {
        var query = "DELETE FROM `Student` WHERE `idStudenten` = ?";
        var id = req.params.id;

        console.log('Student deleteStudent');

        mysql.connection(function (error, connection) {
            if (error) {
                next(error);
            }

            connection.query(query, id, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: rows
                    }).end();
                };
            });
        });
    },
}