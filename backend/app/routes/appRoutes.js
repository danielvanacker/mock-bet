'use strict';
module.exports = (app) => {
    var bets = require('../controller/appController');

    // bets routes
    app.route('/bets')
        .get(bets.list_all_bets)
        .post(bets.create_a_bet);
    
    app.route('/bets/:betId')
        .get(bets.read_a_bet)
        .put(bets.update_a_bet)
        .delete(bets.delete_a_bet);
};