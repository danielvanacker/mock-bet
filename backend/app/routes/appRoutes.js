'use strict';
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = (app) => {
    var bets = require('../controller/appController');

    const checkJwt = jwt({
        secret: jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `https://dev-pkxcyl-c.auth0.com/.well-known/jwks.json`
        }),

        // Validate the audience and the issuer.
        audience: '9Fc1weW01pK6YGiZkBaRIwHbeCFGQ5cS',
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
};