const baseUrl = 'https://www.cbssports.com/mlb/schedule/';
const mlbGame = require('../model/mlbGameModel')
const rp = require('request-promise');
const $ = require('cheerio');

const mlbScoreScraper = (date) => {
    const newDate = formatDate(date);
    console.log(baseUrl + newDate);
    return rp(baseUrl + newDate)
    .then(function(html) {
        var scoreList = []
        $('tbody > tr', html).map((index, row) => {
            var game = $('.CellGame', row).text().trim().split(/[\s-]+/);
            
            if (game[1]!=null) {
                var score = {
                    date: date,
                    win: game[0],
                    winScore: game[1],
                    lose: game[2],
                    loseScore: game[3]
                };
                scoreList.push(score);
            }
            
            
        });
        return scoreList;
    })
    .catch(function(err) {
        console.error(err);
    });
}

const formatDate = (date) => {
    date = date.replace('-', '');
    date = date.replace('-', '');
    date = date + '/';
    return date;
}

module.exports = mlbScoreScraper;