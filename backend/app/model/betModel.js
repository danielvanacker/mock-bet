'user strict';
var sql = require('./db.js');

// Bet object contructor
var Bet = function(bet) {
    this.league = bet.league;
    this.date_created = new Date();
    this.user_id = bet.user_id;
    this.is_complete = 0;
};

Bet.createBet = function(newBet, result) {
    sql.query('INSERT INTO bets set ?', newBet, (err, res) => {
        if(err) {
            console.log('error: ' + err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};

Bet.getBetById = function(betId, result) {
    sql.query('SELECT * from bets WHERE id = ?', betId, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
        }
        else {
            result(null, res);
      
        }        
    });
};

Bet.getAllBets = function(result) {
    sql.query('SELECT * FROM bets', (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
}

Bet.getUserBets = function(userId, result) {
    sql.query('SELECT * FROM bets WHERE user_id = ?', userId, (err, res) => {
        if(err) {
            console.log('error: ' + err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    })
}

Bet.updateById = function(id, isComplete, result) {
    sql.query('UPDATE bets SET is_complete = ? WHERE id = ?', [isComplete, id], (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(null, err);
        }
        else {   
            result(null, res);
        }
    });
};

Bet.remove = function(id, result) {
    sql.query('DELETE FROM bets WHERE id = ?', id, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Bet;
