import React, { Component } from "react";
import logo from "./logo.png";

import "./App.css";
let SLPSDK = require("slp-sdk/lib/SLP").default;
let SLP = new SLPSDK();
let langs = [
  "english",
  "chinese_simplified",
  "chinese_traditional",
  "korean",
  "japanese",
  "french",
  "italian",
  "spanish"
];

let lang = langs[Math.floor(Math.random() * langs.length)];

// create 256 bit BIP39 mnemonic
let mnemonic = SLP.Mnemonic.generate(256, SLP.Mnemonic.wordLists()[lang]);

// root seed buffer
let rootSeed = SLP.Mnemonic.toSeed(mnemonic);

// master HDNode
let masterHDNode = SLP.HDNode.fromSeed(rootSeed, "bitcoincash");

// HDNode of BIP44 account
let account = SLP.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");

// derive the first external change address HDNode which is going to spend utxo
let change = SLP.HDNode.derivePath(account, "0/0");

// get the cash address
let cashAddress = SLP.HDNode.toCashAddress(change);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      mnemonic: mnemonic,
      lang: lang,
      hex: "",
      txid: ""
    };
  }

  componentDidMount() {
    (async () => {
      try {
        let list = await SLP.Utils.list();
        let fin = [];
        console.log(list);
        list.forEach(token => {
          let path = "https://explorer.bitcoin.com/bch/tx/" + token.id;
          fin.push(
            <li>
              <a href={path} target="_blank">
                {token.name !== "" ? token.name : token.id}
              </a>
            </li>
          );
        });
        this.setState({
          tokens: fin
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }

  render() {
    let addresses = [];
    for (let i = 0; i < 10; i++) {
      let account = masterHDNode.derivePath(`m/44'/145'/0'/0/${i}`);
      let addy = SLP.HDNode.toCashAddress(account);
      let slpAddy = SLP.Address.toSLPAddress(addy);
      let path = "https://explorer.bitcoin.com/bch/address/" + addy;
      addresses.push(
        <li key={i}>
          m/44&rsquo;/145&rsquo;/0&rsquo;/0/
          {i}:{" "}
          <a href={path} target="_blank">
            {slpAddy}
          </a>
        </li>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Simple Ledger Protocol</h1>
        </header>
        <div className="App-content">
          <h2>BIP44 $BCH Wallet</h2>
          <h3>256 bit {lang} BIP39 Mnemonic:</h3> <p>{this.state.mnemonic}</p>
          <h3>BIP44 Account</h3>
          <p>
            <code>"m/44'/145'/0'"</code>
          </p>
          <h3>BIP44 external change addresses</h3>
          <ul>{addresses}</ul>
          <h3>List all SLP Tokens</h3>
          <ul>{this.state.tokens}</ul>
        </div>
      </div>
    );
  }
}

export default App;
