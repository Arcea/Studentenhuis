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

module.exports = Meal;