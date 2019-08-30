'use strict';

var mysql = require('mysql');

// Local mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mockbetdb'
});

connection.connect((err) => {
    console.log('Connected!');
    if (err) throw err;
});

module.exports = connection;