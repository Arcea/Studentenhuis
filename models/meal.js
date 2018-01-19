var mysql = require('../database/connection');
var Meal = function(){}

//Ophalen van alle maaltijden
Meal.getMeal = function(callback) {
   var query = "SELECT * FROM `Maaltijd`";
   //Connectie wordt gemaakt, deze functie staat beschreven in de dbconnection file.
   mysql.connection(function (err,conn){
        if(err){
            console.log(err);
        }
        //Als er geen errors zijn. Wordt er in de opgezette connectie onze query uitgevoerd
        conn.query(query, function (err, rows){
            if(err){
                console.log(err);
            } else {
                //console.log(rows);
                //De connectie wordt weer vrijgelaten. .end(); is depricated
                conn.release();
                return callback(null, rows);
            }
        })
   })
};

//Toevoegen van een maaltijd
Meal.addMeal = function(obj, callback){
    var query = "INSERT INTO `Maaltijd` VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)";
    mysql.connection(function (err, conn) {
        if (err) {
             console.log(err);
        }
        //Al deze obj. variabele komen uit de body. Deze worden dan toegevoegd aan de database.
        conn.query(query, [obj.idKok, obj.naamMaaltijd, obj.maaltijdAfbeelding, obj.maxEters, obj.maaltijdBeginTijd, obj.maaltijdEindTijd,
                          obj.kosten, obj.beschrijving], function (err, rows) {
            if (err) {
                return callback(err,null);
            } else{
                return callback(null, rows);
            }
        });
    })
};


module.exports = Meal;