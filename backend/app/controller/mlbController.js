'use strict';

var MlbGame = require('../model/mlbGameModel');
var ScheduleCheck = require('../model/scheduleModel');
const scraper = require('../scrapers/mlbScheduleScraper');

exports.list_all_games = (req, res) => {
    MlbGame.getAllGames((err, games) => {
        if(err) {
            res.send(err);
        }
        res.send(games);
    });
};

// Update the scores of the games.
exports.update_scores = (req, res) => {
    res.send({ error: false, message: 'TODO: Implement the update mlb scores route' })
}

// List all games on a certain date.
exports.list_games_by_date = (req, res) => {
    
    // Check for date in body.
    if (!req.body.start_date) {
        res.status(400).send({ error: true, message: 'Please provide start_date in the format YYYY-MM-DD.' });
    } 

    else {

        // Check to see if the ScheduleCheck table has data for the date.
        ScheduleCheck.checkMlb(req.body.start_date, (err, isGames) => {
            if(err) {
                res.send(err)
            }

            // If there is no entry in the table for that date, get games for that date and make an entry in scheduleCheck.
            else if (isGames.length < 1) {
                // Scrape the web for MLB games
                scraper(req.body.start_date).then(function(gameList) {
                    if(gameList.length > 0) {
                        gameList.forEach((game, index) => {
                            MlbGame.createGame(game, (err, gameId) => {
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
                    MlbGame.getGamesByDate(req.body.start_date, (err, games) => {
                        if(err) {
                            res.send(err);
                        }
                        res.send({message: 'Sending Games after first addition', games: games});
                    });
                });
            }

            // There are no MLB games on this date.
            else if (isGames.mlb == 0) {
                res.send( {error: false, message: 'No games for this date' });
            }

            // Return the MLB games for that date.
            else {
                MlbGame.getGamesByDate(req.body.start_date, (err, games) => {
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
    var newGame = new MlbGame(req.body);

    // Handle null err.
    if (!newGame.start_date || !newGame.home || !newGame.away) {
        res.status(400).send({ error: true, message: 'Please provide start_date, home, and away'});
    }
    else {
        MlbGame.createGame(newGame, (err, gameId) => {
            if (err) {
                res.send(err);
            }
            res.json(gameId);
        })
    }
};