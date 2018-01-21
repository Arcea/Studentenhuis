var meals = require('../models/meal');
var encrypt = require('../Helper/encrypt');

module.exports = {
    getMeals(req, res, next) {
        console.log('Meal getAll');

        meals.getMeals(function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result.length < 1) {
                    res.sendStatus(404);
                } else {
                    res.status(200).json({
                        status: 'OK',
                        result: result
                    }).end();
                }
            }
        });
    },

    getMealById(req, res, next) {
        console.log('Meal getMealById');

        meals.getMealById(req.params.id, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result.length < 1) {
                    res.sendStatus(404);
                } else {
                    res.status(200).json({
                        status: 'OK',
                        result: result[0]
                    }).end();
                }
            }
        });
    },

    addMeal(req, res, next) {
        let token = req.headers["authentication"];
        req.body.idKok = encrypt.getPayload(token).userID;
        if (!req.body.idKok || !req.body.naamMaaltijd || !req.body.maxEters || !req.body.maaltijdBeginTijd || !req.body.kosten) {
            res.sendStatus(400);
        } else {
            meals.addMeal([req.body.idKok, req.body.naamMaaltijd, req.body.maaltijdAfbeelding, req.body.maxEters, req.body.maaltijdBeginTijd, req.body.kosten, req.body.beschrijving], function (err, result) {
                if (err) {
                    next(err);
                } else {
                    res.status(200).json({
                        status: 'OK',
                        result: result
                    }).end();
                }
            });
        }
    },

    updateMeal(req, res, next) {
        console.log('Meal updateMeal');

        if (!req.body.idKok || !req.body.naamMaaltijd || !req.body.maxEters || !req.body.maaltijdBeginTijd || !req.body.maaltijdEindTijd || !req.body.kosten) {
            res.sendStatus(400);
        } else {
            meals.updateMeal(req.params.id, [req.body.idKok, req.body.naamMaaltijd, req.body.maaltijdAfbeelding, req.body.maxEters, req.body.maaltijdBeginTijd, req.body.maaltijdEindTijd, req.body.kosten, req.body.beschrijving], function (err, result) {
                if (err) {
                    next(err);
                } else {
                    res.status(200).json({
                        status: 'OK',
                        result: result
                    }).end();
                }
            });
        }
    },

    deleteMeal(req, res, next) {
        console.log('Meal deleteMeal');

        meals.deleteMeal(req.params.id, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.status(200).json({
                    status: 'OK',
                    result: result
                }).end();
            }
        });
    },

    getParticipants(req, res, next) {
        console.log('Meal getParticipants');

        meals.getParticipants(req.params.id, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.status(200).json({
                    status: 'OK',
                    result: result
                }).end();
            }
        });
    },

    addStudent(req, res, next) {
        meals.getMealById(req.params.id, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result.length < 1) {
                    res.sendStatus(404);
                } else {
                    if (!req.body.idStudent || !req.body.aantalMeeEters) {
                        res.sendStatus(400);
                    } else {
                        let participantsCount, maxParticipantsCount = 0;

                        meals.getParticipants(req.params.id, function (err, result) {
                            if (err) {
                                next(err);
                            } else {
                                for (var i = result.length - 1; i >= 0; i--) {
                                    if (req.body.idStudent == result[i].idStudent) {
                                        next("Already signed up for that meal.");
                                        break;
                                    }
                                }
                            }
                        });

                        meals.getParticipantsCount(req.params.id, function (err, result) {
                            if (err) {
                                next(err);
                            } else {
                                participantsCount = result[0].totaalAantalMeeEters;
                            }
                        });

                        meals.getMaxParticipantsCount(req.params.id, function (err, result) {
                            if (err) {
                                next(err);
                            } else {
                                maxParticipantsCount = result[0].maxEters;
                            }
                        });

                        if (participantsCount + req.body.aantalMeeEters > maxParticipantsCount) {
                            next("No room left for this meal.");
                        } else {
                            meals.addStudent(req.params.id, [req.body.idStudent, req.body.aantalMeeEters], function (err, result) {
                                if (err) {
                                    next(err);
                                } else {
                                    try {
                                        res.status(200).json({
                                            status: 'OK',
                                            result: result
                                        }).end();
                                    } catch (err) {
                                        // It's fine -- really!
                                        if (err.name !== "Error [ERR_HTTP_HEADERS_SENT]") {
                                            next(err);
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            }
        });
    },
}