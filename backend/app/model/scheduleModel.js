// Schedule is a table with 2 columns: date and MLB.
// Date indicates the date
// MLB is boolean. If true, there are games on that date. If false there are not. If null, the date has not been checked.

'user strict';
var sql = require('./db.js');

// ScheduleCheck object contructor.
var ScheduleCheck = function(schedule) {
    this.date = schedule.date;
    this.mlb = schedule.mlb || null;
};

// Create an entry in the table. Only date is required.
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

// Get the Boolean value for MLB for a certain date (YYYY-MM-DD).
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

