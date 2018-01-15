let express = require('express');
let bodyParser = require('body-parser');
let JWT = require('./middleware/JWT').JWT;
let cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser())
//Please keep this middleware as the second, to prevent unnecesarry calculations on invalid requests.
app.use(function(req, res, next) {
    JWT(req, res, next);
});
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

let port = process.argv[2] || process.env.PORT || 8000;

app.listen(port, function () {
    console.log("Server listening on " + port);
});
