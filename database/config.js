/* Voor lokaal testen, updaten met lokale database gegevens */
module.exports = {
    "host": 'localhost',
    "database": 'mydb',
    "user": 'root',
    "password": '',
    "dbport": 3306,
    "port": process.env.PORT || 3000,
};
/* Modules voor heroku 
module.exports = {
    "host": process.env.host,
    "database": process.env.dbName,
    "user": process.env.dbUser,
    "password": process.env.dbPwd,
    "dbport": 3306,
    "port":  process.env.PORT || 3000,
}; */