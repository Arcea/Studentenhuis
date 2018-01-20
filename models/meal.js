var mysql = require('../database/connection');

module.exports = {
    getMeals(req, res, next) {
        var query = "SELECT * FROM `Maaltijd`";

        console.log('Meal getAll');

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

    getMealById(req, res, next) {
        var query = "SELECT * FROM `Maaltijd` WHERE `idMaaltijd` = ?";
        var id = req.params.id;

        console.log('Meal getMealById');

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

    addMeal(req, res, next) {
        var query = "INSERT INTO `Maaltijd` VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)";
        var params = [
            req.body.idKok,
            req.body.naamMaaltijd,
            req.body.maaltijdAfbeelding,
            req.body.maxEters,
            req.body.maaltijdBeginTijd,
            req.body.maaltijdEindTijd,
            req.body.kosten,
            req.body.beschrijving
        ];

        console.log('Meal addMeal');

        if (!req.body.idKok || !req.body.naamMaaltijd || !req.body.maxEters || !req.body.maaltijdBeginTijd || !req.body.maaltijdEindTijd || !req.body.kosten) {
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

    updateMeal(req, res, next) {
        var query = "UPDATE `Maaltijd` SET ? WHERE `maaltijd`.`idMaaltijd` = ?";
        var params = [
            {
                "idKok": req.body.idKok,
                "naamMaaltijd": req.body.naamMaaltijd,
                "maaltijdAfbeelding": req.body.maaltijdAfbeelding,
                "maxEters": req.body.maxEters,
                "maaltijdBeginTijd": req.body.maaltijdBeginTijd,
                "maaltijdEindTijd": req.body.maaltijdEindTijd,
                "kosten": req.body.kosten,
                "beschrijving": req.body.beschrijving
            },
            req.params.id
        ];

        console.log('Meal updateMeal');

        if (!req.body.idKok || !req.body.naamMaaltijd || !req.body.maxEters || !req.body.maaltijdBeginTijd || !req.body.maaltijdEindTijd || !req.body.kosten) {
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

    deleteMeal(req, res, next) {
        var query = "DELETE FROM `Maaltijd` WHERE `idMaaltijd` = ?";
        var id = req.params.id;

        console.log('Meal deleteMeal');

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
        var query = "INSERT INTO `studentmaaltijd` (`idStudent`, `idMaaltijd`, `aantalMeeEters`) VALUES (?, ?, ?);";
        var params = [
            req.body.idStudent,
            req.params.id,
            req.body.aantalMeeEters
        ];
        var totaalAantalMeeEters, maxEters = 0;
        var idStudent = req.body.idStudent;

        console.log('Meal addStudent');

        if (!req.body.idStudent || !req.body.aantalMeeEters) {
            next("Missing properties.");
        }

        mysql.connection(function (error, connection) {
            if (error) {
                next(error);
            }

            connection.query("SELECT `idStudent` FROM `studentmaaltijd`", req.params.id, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else {
                    if (rows) {
                        for (var i = rows.length - 1; i >= 0; i--) {
                            if (idStudent == rows[i].idStudent) {
                                next("Already signed up for that maaltijd.");
                                break;
                            }
                        }
                    } else {
                        next("Can't retrieve students.");
                    }
                };
            });

            connection.query("SELECT SUM(`aantalMeeEters`) AS `totaalAantalMeeEters` FROM `studentmaaltijd` WHERE `idMaaltijd` = ?", req.params.id, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else {
                    if (rows) {
                        totaalAantalMeeEters = rows[0].totaalAantalMeeEters;
                    } else {
                        next("Can't retrieve mee-eters.");
                    }
                };
            });

            connection.query("SELECT * FROM `Maaltijd` WHERE `idMaaltijd` = ?", req.params.id, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else {
                    if (rows) {
                        maxEters = rows[0].maxEters;
                    } else {
                        next("Can't retrieve max eters.");
                    }
                };
            });

            if ((totaalAantalMeeEters + req.body.aantalMeeEters) > maxEters) {
                next("Maaltijd is already full.");
            } else {
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
            }
        });
    },

    getMeeEters(req, res, next) {
        mysql.connection(function (error, connection) {
            if (error) {
                next(error);
            }

            connection.query("SELECT * FROM `studentmaaltijd` WHERE `idMaaltijd` = ?", req.params.id, function (error, rows, fields) {
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
    }
}