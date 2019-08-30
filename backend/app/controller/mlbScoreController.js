'use strict';

var Mlb = require('../model/mlbModel');

exports.list_all_games = (req, res) => {
    Mlb.getAllGames((err, games) => {
        if(err) {
            res.send(err);
        }
        res.send(games);
    });
};

exports.list_games_by_date = (req, res) => {
    if (!req.body.start_date) {
        res.status(400).send({ error: true, message: 'Please provide start_date in the format YYYY-MM-DD.' });
    }
    else {
        Mlb.getGamesByDate(req.body.start_date, (err, games) => {
            if(err) {
                res.send(err);
            }
            res.send(games);
        });
    }
};

// Creates a new game.
exports.create_a_game = (req, res) => {
    var newGame = new Mlb(req.body);

    // Handle null err.
    if (!newGame.start_date || !newGame.home || !newGame.away || !newGame.home || !newGame.is_complete) {
        res.status(400).send({ error: true, message: 'Please provide start_date, home, away, and is_complete.'});
    }
    else {
        Mlb.createGame(newGame, (err, gameId) => {
            if (err) {
                res.send(err);
            }
            res.json(gameId);
        })
    }
};