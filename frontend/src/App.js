import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Callback from './Callback';
import NavBar from './NavBar/NavBar';
import Bets from './Bets/Bets';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={Bets}/>
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default App;