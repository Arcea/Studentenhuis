/* Voor lokaal testen, updaten met lokale database gegevens 
module.exports = {
    "host": 'localhost',
    "database": 'mydb',
    "user": 'root',
    "password": '',
    "dbport": 3306,
    "port": process.env.PORT || 3000,
};
*/
/* Modules voor heroku */
module.exports = {
    "host": process.env.JAWSDB_URL || 'localhost',
    "database": process.env.JAWSDB_URL != undefined ? undefined : "mydb",
    "user": process.env.JAWSDB_URL != undefined ? undefined : "root",
    "password": process.env.JAWSDB_URL != undefined ? undefined : "",
    "dbport": process.env.JAWSDB_URL != undefined ? undefined : "3306"
};