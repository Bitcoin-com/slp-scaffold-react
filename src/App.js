import React, { Component } from 'react';
import logo from './logo.png';

import './App.css';
let Wormhole = require('wormholecash/lib/Wormhole').default;
let wormhole = new Wormhole();


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello Wormhole</h1>
        </header>
        <div className='App-content'>
        </div>
      </div>
    );
  }
}

export default App;
