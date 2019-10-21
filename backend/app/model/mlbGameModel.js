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

// Gets an mlb game based on the home teams cbs abreviations and the date.
MlbGame.getGameByHomeAbrev = function(date, abrev, result) {
    sql.query(`SELECT mlb_teams.cbs_schedule_abrev, mlb_games.start_date, mlb_games.home, mlb_games.away
    FROM mlb_teams INNER JOIN mlb_games ON mlb_teams.cbs_schedule_name=mlb_games.home 
    WHERE start_date=\'${date}\' AND mlb_teams.cbs_schedule_abrev = \'${abrev}\'`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
    //input: { date, win, winScore, lose, loseScore }
    //Result: update the game on 'date' with home: 'win' || 'lose' and away: 'win' || 'lose' 
    // i.e. we want to first get cbs_sched_name for home and away, then check both
    // combos of win and away above for given date and update the scores appropriately. 
}

MlbGame.setGameScore = function(date, home, home_runs, away, away_runs, result) {
    sql.query(`UPDATE mlb_games SET mlb_games.home_runs=\'${home_runs}\', mlb_games.away_runs=\'${away_runs}\'
    WHERE (start_date= ? AND home=\'${home}\' AND away=\'${away}\');`, date, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
}

module.exports = MlbGame;