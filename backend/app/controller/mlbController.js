'use strict';

var MlbGame = require('../model/mlbGameModel');
var ScheduleCheck = require('../model/scheduleModel');
const scraper = require('../scrapers/mlbScheduleScraper');
const scoreScraper = require('../scrapers/mlbScoreScraper');

exports.list_all_games = (req, res) => {
    MlbGame.getAllGames((err, games) => {
        if(err) {
            res.send(err);
        }
        res.send(games);
    });
};

// Update the scores of the games. Must have games in the database for a date before calling
exports.update_scores = (req, res) => {
    if (!req.query.start_date) {
        res.status(400).send({ error: true, message: 'Please provide start_date in the format YYYY-MM-DD.' });
    } 

    var start_date = req.query.start_date;

    scoreScraper(start_date).then(function(gameList) {
        gameList.map((game) => {
            console.log(game);
            const {date, win, winScore, lose, loseScore} = game;
            MlbGame.getGameByHomeAbrev(date, win, (err, res) => {
                if(res.length < 1) {
                    MlbGame.getGameByHomeAbrev(date, lose, (err, res) => {
                        const [{cbs_schedule_abrev, start_date, home, away}] = res;
                        MlbGame.setGameScore(start_date, home, loseScore, away, winScore, (err, res) => {
                            if(err) {
                                // Handle Error
                            }
                        });
                    });
                }
                else {
                    const [{cbs_schedule_abrev, start_date, home, away}] = res;
                    MlbGame.setGameScore(start_date, home, winScore, away, loseScore, (err, res) => {
                        if(err) {
                            // Handle Error
                        }
                    });
                }
            });
        });
        res.send({ error: false, message: 'Scores have been updated' });
    });
}

// List all games on a certain date.
exports.list_games_by_date = (req, res) => {
    
    // Check for date in body.
    if (!req.query.start_date) {
        res.status(400).send({ error: true, message: 'Please provide start_date in the format YYYY-MM-DD.' });
    } 

    else {
        var start_date = req.query.start_date

        // Check to see if the ScheduleCheck table has data for the date.
        ScheduleCheck.checkMlb(start_date, (err, isGames) => {
            if(err) {
                res.send(err)
            }

            // If there is no entry in the table for that date, get games for that date and make an entry in scheduleCheck.
            else if (isGames.length < 1) {
                // Scrape the web for MLB games
                scraper(start_date).then(function(gameList) {
                    console.log(gameList);
                    if(gameList.length > 0) {
                        gameList.forEach((game, index) => {
                            MlbGame.createGame(game, (err, gameId) => {
                                if(err) {
                                    // TODO handle error
                                }
                            });
                        });
                        ScheduleCheck.createDate({ date: start_date, mlb: 1 }, (err, dateId) => {
                            if(err) {
                                // TODO handle error
                            }
                        });
                    }
                    else {
                        ScheduleCheck.createDate({ date: start_date, mlb: 0 }, (err, dateId) => {
                            if(err) {
                                // TODO handle error
                            }
                        });
                    }

                    

                    MlbGame.getGamesByDate(start_date, (err, games) => {
                        if(err) {
                            res.send(err);
                        }
                        res.send({message: 'Sending Games after first addition', games: games});
                    });
                });

            }
            else {
                const [{mlb}] = isGames;
                // There are no MLB games on this date.
                if (mlb == 0) {
                    res.send( {error: false, message: 'No games for this date' });
                }

                // Return the MLB games for that date.
                else {
                    MlbGame.getGamesByDate(start_date, (err, games) => {
                        if(err) {
                            res.send(err);
                        }
                        res.send({message: 'Sending Games', games: games});
                    });
                }
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