var express = require('express');
var routes = express.Router();

routes.get('/', function(req, res){
    res.contentType('application/json');
    res.status(200);
    res.json({'tekst' : 'Welcome to the app'})
});

module.exports = routes;