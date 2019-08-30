'user strict';
var sql = require('./db.js');

// ScheduleCheck object contructor
var ScheduleCheck = function(schedule) {
    this.date = schedule.date;
    this.mlb = schedule.mlb || null;
};

ScheduleCheck.createDate = function(newDate, result) {
    sql.query('INSERT INTO schedule_check set ?', newDate, (err, res) => {
        if(err) {
            console.log('error: ' + err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};

ScheduleCheck.checkMlb = function(date, result) {
    sql.query('SELECT mlb FROM schedule_check WHERE date = ?', date, (err, res) => {
        if(err) {
            console.log('error: ' + err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    })
};

module.exports = ScheduleCheck;

