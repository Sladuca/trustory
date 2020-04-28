import React, { Component } from "react";
import Trustory from "./contracts/Trustory.json";
import getWeb3 from "./getWeb3";
import * as crypto from "eth-crypto";
import multihashes from 'multihashes';

import "./App.css";

// **********************************
// Taken from https://ethereum.stackexchange.com/questions/17094/how-to-store-ipfs-hash-using-bytes

const ipfs2multihash = (hash) => {
  let mh = multihashes.fromB58String(Buffer.from(hash));
  return {
    hashFunction: '0x' + mh.slice(0, 1).toString('hex'),
    size: '0x' + mh.slice(1, 2).toString('hex'),
    digest: '0x' + mh.slice(2).toString('hex'),
  };
};

// *********************************

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, mode: 0, modeData: {
    holder: '',
    pub: '',
    id: '',
  } };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Trustory.networks[networkId];
      const instance = new web3.eth.Contract(
        Trustory.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  request = () => {
    const { holder, pub, id } = this.state.modeData;
    const { accounts, contract } = this.state;
    console.log(holder, pub, id)
    // Stores a given value, 5 by default.
    contract.methods.requestViewCert(holder, pub, id).send({ from: accounts[0] }).then(() => {
      // Update state with the result.
    this.setState({ ...this.state, mode: 1 });
    }).catch(err => {
      console.error(JSON.stringify(err, null, 2))
    })
  };

  // approve = async (requestor, id, ipfsHash) => {
  //   const { accounts, contract } = this.state;
  // }

  updateFormState = (holder, pub, id) => {
    this.setState({ ...this.state, modeData: { holder, pub, id }})
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    
    if (this.state.mode === 0) {
      return (
        <div className="App">
          <h1>Trustory Demo</h1>
          <h2>Request Example</h2>
          <p>
            try requesting to view a cert with the input below
          </p>
          <form onSubmit={(e) => { e.preventDefault(); this.request() }}>
            <label>
              Cert holder's address
              <input type="text" value={this.state.modeData.holder} onChange={(e) => this.updateFormState(e.target.value, this.state.modeData.pub, this.state.modeData.id)}></input>
            </label>
            <label>
              Cert holder's public key
              <input type="text" value={this.state.modeData.pub} onChange={(e) => this.updateFormState(this.state.modeData.holder, e.target.value, this.state.modeData.id)}></input>
            </label>
            <label>
              Cert ID
              <input type="text" value={this.state.modeData.id} onChange={(e) => this.updateFormState(this.state.modeData.holder, this.state.modeData.pub, e.target.value)}></input>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>Trustory Demo</h1>
          <h2>Approve Example</h2>
          <p>
            try approving the request events shown below
          </p>
        </div>
      );
    }
  }
}

export default App;
