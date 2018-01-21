var mysql = require('mysql');
var config = require('./config');

console.log(config.host);
var pool = mysql.createPool({
    connectionLimit: 50,
    host: config.host,
    debug: false
});

/* 
    Gebruik van de module node-mysql, een wrapper
    Zorgt ervoor dat de connectie niet constant open-staat.
*/
var connection = function (callback) {
    console.log("pool");
    console.log(pool)
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log("error making connection");
            console.log(err);
            callback(err, null);
            return;
        } else {
            console.log("Connection success");
            console.log(conn);
            return callback(null, conn);
        }
    })
};

exports.connection = connection;