var meals = require('../models/meal');
var encrypt = require('../Helper/encrypt');
let fs = require("fs");

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
            let maaltijdAfbeeldingPath = null;
            if(req.body.maaltijdAfbeelding) {
                maaltijdAfbeelingPath = "../../images/" + req.body.naamMaaltijd + req.body.idKok + req.body.kosten + req.body.maaltijdBeginTijd;

                if(req.body.maaltijdAfbeelding.includes("/^data:image\/png;base64,/")) {
                    maaltijdAfbeeldingPath += ".png";

                    let base64Image = req.body.maaltijdAfbeelding.replace(/^data:image\/png;base64,/, "");

                    fs.writeFile(maaltijdAfbeeldingPath, base64Image, 'base64', function(err) {
                        console.log(err);
                    });
                } else if (req.body.maaltijdAfbeelding.includes("/^data:image\/jpeg;base64,/")) {
                    maaltijdAfbeeldingPath += ".jpg";

                    let base64Image = req.body.maaltijdAfbeelding.replace(/^data:image\/jpeg;base64,/, "");

                    fs.writeFile(maaltijdAfbeeldingPath, base64Image, 'base64', function(err) {
                        console.log(err);
                    });
                } else {
                    res.status(400).end("Images only support .png and .jpg");
                }
            }
            meals.addMeal([req.body.idKok, req.body.naamMaaltijd, maaltijdAfbeeldingPath, req.body.maxEters, req.body.maaltijdBeginTijd, req.body.kosten, req.body.beschrijving], function (err, result) {
                if (err) {
                    next(err);
                } else {
                    res.status(200).json({
                        status: 'OK',
                        result: result
                    });
                }
            });
        }
    },

    updateMeal(req, res, next) {
        console.log('Meal updateMeal');

        if (!req.body.idKok || !req.body.naamMaaltijd || !req.body.maxEters || !req.body.maaltijdBeginTijd || !req.body.kosten) {
            console.log('fail');
            res.sendStatus(400);
        } else {
            meals.updateMeal(req.params.id, [req.body.idKok, req.body.naamMaaltijd, req.body.maaltijdAfbeelding, req.body.maxEters, req.body.maaltijdBeginTijd, req.body.kosten, req.body.beschrijving], function (err, result) {
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

    //On the third day God created Callbacks, humans quickly abused these new powers, leading to the invention of CALLBACK HELL!
    addStudent(req, res, next) {
        meals.getMealById(req.params.id, function (err, result) {
            if (err) {
                next(err);
            } else {
                if (result.length < 1) {
                    res.sendStatus(404);
                } else {
                    let token = req.headers["authentication"];
                    req.body.idStudent = encrypt.getPayload(token).userID;
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
                                        return;
                                    } else {
                                        meals.getParticipantsCount(req.params.id, function (err, result) {
                                            if (err) {
                                                next(err);
                                            } else {
                                                participantsCount = result[0].totaalAantalMeeEters;

                                                meals.getMaxParticipantsCount(req.params.id, function (err, result) {
                                                    if (err) {
                                                        next(err);
                                                    } else {
                                                        maxParticipantsCount = result[0].maxEters;

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
                                                });
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            }
        });
    }
}