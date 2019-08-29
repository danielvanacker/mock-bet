'use strict';

var mysql = require('mysql');

// Local mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aa23#firpDoom7',
    database: 'mockbetdb'
});

module.exports = connection;