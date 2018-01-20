let express = require('express');
let bodyParser = require('body-parser');
let JWT = require('./middleware/JWT').JWT;
let routes = require('./routes');

const app = express();

//Please keep this middleware as the first, to prevent unnecesarry calculations on invalid requests.
app.use(function(req, res, next) {
    JWT(req, res, next);
});
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(routes);

let port = process.argv[2] || process.env.PORT || 8000;

app.listen(port, function () {
    console.log("Server listening on " + port);
});

module.exports = app;