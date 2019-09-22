'user strict';
var sql = require('./db.js');

// Defines the mlb_teams table.
var MlbTeam = function(mlbTeam) {
    this.id = mlbTeam.id;
    this.cbs_schedule_name = mlbTeam.cbs_schedule_name;
    this.cbs_schedule_abrev = mlbTeam.cbs_schedule_abrev;
    this.team_city = mlbTeam.team_city;
    this.team_name = mlbTeam.team_name;
};

MlbTeam.getTeamByCbsName = function(cbs_schedule_name, result) {
    sql.query('SELECT * FROM mlb_teams WHERE cbs_schedule_name = ?', cbs_schedule_name, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

MlbTeam.getTeamByCbsAbrev = function(cbs_schedule_abrev, result) {
    sql.query('SELECT * FROM mlb_teams WHERE cbs_schedule_abrev = ?', cbs_schedule_abrev, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = MlbTeam;