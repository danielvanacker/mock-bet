// const baseUrl = 'https://www.cbssports.com/mlb/schedule/';
// const mlbGame = require('../model/mlbModel')
// const rp = require('request-promise');
// const $ = require('cheerio');

// const mlbScoreScraper = (date) => {
//     const newDate = formatDate(date);
//     console.log(baseUrl + newDate);
//     return rp(baseUrl + newDate)
//     .then(function(html) {
//         var gameList = []
//         $('tbody > tr', html).map((index, row) => {
//             var awayTeam = $(':first-child > span > .TeamName > a', row).html();
//             var temp = $(':first-child', row).siblings().html();
//             var homeTeam = $('span > .TeamName > a', temp).text();
//             var game = new mlbGame({home: homeTeam, away: awayTeam, start_date: date})
//             gameList.push(game);
            
//         });
//         return gameList;
//     })
//     .catch(function(err) {
//         console.error(err);
//     });
// }

// const formatDate = (date) => {
//     date = date.replace('-', '');
//     date = date.replace('-', '');
//     date = date + '/';
//     return date;
// }

// module.exports = mlbScoreScraper;