const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const port = process.env.PORT || 8081;

var app = express();

app.use(cors());
app.use(helmet());

app.listen(port, () => {
    console.log('Express app listening on port ' + port);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/appRoutes');
routes(app);

const mlbGame = require('./app/model/mlbGameModel');
const mlbTeam = require('./app/model/mlbTeamModel');
const scraper = require('./app/scrapers/mlbScheduleScraper');
scraper('2019-09-15').then(async function(gameList) {
    //console.log(gameList)
    console.log(gameList[0]);
    // if (gameList[0].away_id == -1) {
    //     await mlbTeam.getTeamByCbsName(gameList[0].home, (err, team) => {
    //         if (err) {
    //             console.log("ERROR: " + err);
    //             return; // TODO handle errror
    //         }
    //         else {
    //             console.log(`HERE`)
    //             gameList[0].away_id = team[0].id;
    //             console.log(gameList[0]);
    //         }
    //     });
    // }
    mlbGame.createGame(gameList[0], (err, gameId) => {
        if(err) {
            console.log(err)
        }
    });
});

// const mlbTeam = require('./app/model/mlbTeamModel')
// mlbTeam.getTeamByCbsName('Philadelphia', (err, team) => {
//     if (err) {
//         console.log(err);
//         return; // TODO handle errror
//     }
//     else {
//         console.log(team[0].id)
//     }
// });