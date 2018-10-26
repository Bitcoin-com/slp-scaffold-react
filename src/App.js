import React, { Component } from "react";
import logo from "./logo.png";

import "./App.css";
let SLPSDK = require("slp-sdk/lib/SLP").default;
let SLP = new SLPSDK();
(async () => {
  try {
    let list = await SLP.list();
    console.log(list);
  } catch (error) {
    console.error(error);
  }
})();

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello SLP</h1>
        </header>
        <div className="App-content" />
      </div>
    );
  }
}

export default App;
