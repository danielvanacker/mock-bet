'use strict';

var Mlb = require('../model/mlbModel');
var ScheduleCheck = require('../model/scheduleModel');
const scraper = require('../scrapers/mlbScheduleScraper');

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
        ScheduleCheck.checkMlb(req.body.start_date, (err, isGames) => {
            if(err) {
                res.send(err)
            }
            else if (isGames.length < 1) {
                scraper(req.body.start_date).then(function(gameList) {
                    if(gameList.length > 0) {
                        gameList.forEach((game, index) => {
                            Mlb.createGame(game, (err, gameId) => {
                                if(err) {
                                    // TODO handle error
                                }
                            });
                        });
                        ScheduleCheck.createDate({ date: req.body.start_date, mlb: 1 }, (err, dateId) => {
                            if(err) {
                                // TODO handle error
                            }
                        });
                    }
                    Mlb.getGamesByDate(req.body.start_date, (err, games) => {
                        if(err) {
                            res.send(err);
                        }
                        res.send({message: 'Sending Games after first addition', games: games});
                    });
                });
            }
            else if (isGames.mlb == 0) {
                res.send( {error: false, message: 'No games for this date' });
            }
            else {
                Mlb.getGamesByDate(req.body.start_date, (err, games) => {
                    if(err) {
                        res.send(err);
                    }
                    res.send({message: 'Sending Games', games: games});
                });
            }
        })
    }
};

// Creates a new game.
exports.create_a_game = (req, res) => {
    var newGame = new Mlb(req.body);

    // Handle null err.
    if (!newGame.start_date || !newGame.home || !newGame.away) {
        res.status(400).send({ error: true, message: 'Please provide start_date, home, and away'});
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