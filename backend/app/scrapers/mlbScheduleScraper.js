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
        $('tbody > tr', html).map((index, row) => {
            var awayTeam = ($(':first-child > span > .TeamName > a', row).html()).trim();
            var temp = $(':first-child', row).siblings().html();
            var homeTeam = ($('span > .TeamName > a', temp).text()).trim();
            mlbTeam.getTeamByCbsName(homeTeam, (err, team) => {
                if (err) {
                    console.log(err);
                    return; // TODO handle errror
                }
                else {
                    var home_id = team[0].id;
                    away_id = mlbTeam.getTeamByCbsName(awayTeam, (err, team) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        else {
                            var away_id = team[0].id;
                            var game = new mlbGame({home: homeTeam, away: awayTeam, start_date: date, home_id: home_id, away_id: away_id})
                            gameList.push(game);
                        }
                    })
                }
            });
            // var game = new mlbGame({home: homeTeam, away: awayTeam, start_date: date, home_id: home_id, away_id: away_id})
            // gameList.push(game);
            
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