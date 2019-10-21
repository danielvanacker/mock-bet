'use strict';
require("dotenv").config();

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const audience = process.env.AUDIENCE;

module.exports = (app) => {
    var bets = require('../controller/betsController');
    var mlbGames = require('../controller/mlbController');

    const checkJwt = jwt({
        secret: jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `https://dev-pkxcyl-c.auth0.com/.well-known/jwks.json`
        }),

        // Validate the audience and the issuer.
        audience: audience,
        issuer: `https://dev-pkxcyl-c.auth0.com/`,
        algorithms: ['RS256']
    })

    // bets routes
    app.route('/all-bets')
        .get(bets.list_all_bets);

    app.route('/bets')
        .get(checkJwt, bets.list_user_bets)
        .post(checkJwt, bets.create_a_bet);
    
    app.route('/bets/:betId')
        .get(checkJwt, bets.read_a_bet)
        .put(checkJwt, bets.update_a_bet)
        .delete(checkJwt, bets.delete_a_bet);
    
    app.route('/mlb/all-games')
        .get(mlbGames.list_all_games);

    app.route('/mlb/games')
        .put(checkJwt, mlbGames.update_scores)
        .get(checkJwt, mlbGames.list_games_by_date)
        .post(checkJwt, mlbGames.create_a_game);
};