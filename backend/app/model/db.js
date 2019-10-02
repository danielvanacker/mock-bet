'use strict';
require("dotenv").config();

const dbPw = process.env.DB_PW;
console.log(dbPw);

var mysql = require('mysql');

// Local mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: dbPw,
    database: 'mockbetdb'
});

connection.connect((err) => {
    console.log('Connected!');
    if (err) throw err;
});

module.exports = connection;