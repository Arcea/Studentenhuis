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
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null);
            return;
        } else {
            return callback(null, conn);
        }
    })
};

exports.connection = connection;