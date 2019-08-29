'use strict';

var mysql = require('mysql');

// Local mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mockbetdb'
});

module.exports = connection;