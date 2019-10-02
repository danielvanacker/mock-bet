const baseUrl = 'https://www.cbssports.com/mlb/schedule/';
const mlbGame = require('../model/mlbGameModel');
const mlbTeam = require('../model/mlbTeamModel');
const rp = require('request-promise');
const $ = require('cheerio');

const mlbScheduleScraper = (date) => {
    const newDate = formatDate(date);
    console.log(baseUrl + newDate);
    return rp(baseUrl + newDate)
    .then(function(html) {
        var gameList = []
        $('tbody > tr', html).map(async (index, row) => {
            var awayTeam = ($(':first-child > span > .TeamName > a', row).html()).trim();
            var temp = $(':first-child', row).siblings().html();
            var homeTeam = ($('span > .TeamName > a', temp).text()).trim();
            var game = new mlbGame({home: homeTeam, away: awayTeam, start_date: date, });
            gameList.push(game);
            
        });
        return gameList;
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

module.exports = mlbScheduleScraper;