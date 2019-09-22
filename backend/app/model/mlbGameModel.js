'user strict';
var sql = require('./db.js');

// Mlb object contructor
var MlbGame = function(game) {
    this.start_date = game.start_date; //TODO insert scraped date
    this.home = game.home;
    this.away = game.away;
    this.home_runs = 0;
    this.away_runs = 0;
    this.is_complete = 0;
    this.home_id = game.home_id;
    this.away_id = game.away_id;
};

MlbGame.createGame = function(newGame, result) {
    sql.query('INSERT INTO mlb_games set ?', newGame, (err, res) => {
        if(err) {
            console.log('error: ' + err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};

MlbGame.getAllGames = function(result) {
    sql.query('SELECT * FROM mlb_games', (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

MlbGame.getGamesByDate = function(date, result) {
    sql.query('SELECT * FROM mlb_games WHERE start_date = ?', date, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = MlbGame;