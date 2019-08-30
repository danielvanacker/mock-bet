'user strict';
var sql = require('./db.js');

// Bet object contructor
var Mlb = function(game) {
    this.start_date = '2019-01-01'; //TODO insert scraped date
    this.home = game.home;
    this.away = game.away;
    this.home_runs = game.home_runs;
    this.away_runs = game.away_runs;
    this.is_complete = 0;
};

Mlb.createGame = function(newGame, result) {
    sql.query('INSERT INTO mlb set ?', newGame, (err, res) => {
        if(err) {
            console.log('error: ' + err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};

Mlb.getAllGames = function(result) {
    sql.query('SELECT * FROM mlb', (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Mlb.getGamesByDate = function(date, result) {
    sql.query('SELECT * FROM mlb WHERE start_date = ?', date, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Mlb;