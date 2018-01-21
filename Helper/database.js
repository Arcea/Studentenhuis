let mysql = require('./../database/connection');

module.exports = {
    executeQuery: function(query, callback) {
        mysql.connection(function(err, connection) {
            if(err){
                callback(err);
            } else {
                connection.query(query, function(err, rows, fields) {
                    if(err) {
                        callback(err, null);
                    } else {
                        callback(null, rows);
                    }
                });
            }      
        });
    },

    executeQueryParameterized: function(query, params, callback) {
        mysql.connection(function(err, connection) {
            if(err) {
                callback(err);
            } else {
                console.log(connection);
                connection.query(query, params, function(err, rows, fields) {
                    if(err) {
                        callback(err, null);
                    } else {
                        callback(null, rows);
                    }
                });
            }
        });
    }
}