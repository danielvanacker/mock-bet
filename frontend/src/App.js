import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Callback from './Callback';
import NavBar from './NavBar/NavBar';
import Bets from './Bets/Bets';
import MlbGames from './Mlb/MlbGames';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/mlb' component={MlbGames}/>
        <Route exact path='/' component={MlbGames}/>
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default App;