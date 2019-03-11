import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../stylesheets/app.css';

import Searchbar from './search/searchbar'

import * as API from '../util/game_api_util'
class App extends Component {
  render() {
    return (
          <div className="App">
            <header className="App-header">
              <Searchbar/>
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
    );
  }
}
window.scrapeGames = API.scrapeGames
export default App;