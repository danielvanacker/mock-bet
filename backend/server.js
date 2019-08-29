const express = require('express');
const mySQL = require('mysql');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.listen(port, () => {
    console.log('Express app listening on port ' + port);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/appRoutes');
routes(app);
