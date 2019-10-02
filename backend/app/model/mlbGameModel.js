'user strict';
var sql = require('./db.js');
var mlbTeam = require('./mlbTeamModel');

// Mlb object contructor
var MlbGame = function(game) {
    this.start_date = game.start_date; //TODO insert scraped date
    this.home = game.home;
    this.away = game.away;
    this.home_runs = 0;
    this.away_runs = 0;
    this.is_complete = 0;
};

MlbGame.createGame = async function(newGame, result) {
    
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