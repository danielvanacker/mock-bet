const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const port = process.env.PORT || 8081;

var app = express();

app.use(cors());
app.use(helmet());

app.listen(port, () => {
    console.log('Express app listening on port ' + port);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/appRoutes');
routes(app);
