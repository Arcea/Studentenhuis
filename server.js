let express = require('express');
let bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

let port = process.argv[2] || process.env.PORT || 8000;

app.listen(port, function () {
    console.log("Server listening on " + port);
});
