'use strict';

var Bet = require('../model/betModel');

// Returns a list of all bets.
exports.list_all_bets = (req, res) => {
    Bet.getAllBets((err, bet) => {
        if (err) {
            res.send(err);
        }
        res.send(bet);
    });

};

// Returns a list of all bets for a specific user.
exports.list_user_bets = (req, res) => {
    Bet.getUserBets(req.user.name, (err, bet) => {
        if (err) {
            res.send(err);
        }
        res.send(bet);
    })
}

// Creates a new bet. Must have userID and League.
exports.create_a_bet = (req, res) => {
    var newBet = new Bet(req.body);

    // Handle null err.
    if (!newBet.league || !newBet.user_id) {
        res.status(400).send({ error: true, message: 'Please provide league and user id.'});
    }
    else {
        Bet.createBet(newBet, (err, betId) => {
            if (err) {
                res.send(err);
            }
            res.json(betId);
        })
    }
};

// No user access.
// Reads a bet based on params betID.
exports.read_a_bet = (req, res) => {
    console.log(req.params.betId)
    Bet.getBetById(req.params.betId, (err, bet) => {
        if (err) {
            res.send(err);
        }
        res.json(bet);
    });
};

// No user access.
// Updates isComplete for bet based on params betId. Body must have isComplete.
exports.update_a_bet = (req, res) => {
    Bet.updateById(req.params.betId, req.body.isComplete, (err, bet) => {
        if (err) {
            res.send(err);
        }
        res.json(bet);
    });
};

// No user access.
// Deletes a bet based on params betId.
exports.delete_a_bet = (req, res) => {
    Bet.remove(req.params.betId, (err, bet) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Bet successfully deleted' });
    });
};

