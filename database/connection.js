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
var connection = mysql.createConnection(process.env.JAWSDB_URL || "mysql://root:root@localhost:3306/mydb");

exports.connection = connection;