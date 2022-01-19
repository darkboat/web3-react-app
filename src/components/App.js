import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboard } from "@fortawesome/free-solid-svg-icons"
import { faEthereum } from "@fortawesome/free-brands-svg-icons"

import "../css/center.css"
import "../css/theme.css"

class App extends Component {
  constructor(){
    super()

    this.state = {
      balance: null
    }
  }

  async componentDidMount(){
    let balance = await window.web3.eth.getBalance(window.account.address)

    this.setState({
      balance
    })
  }

  render() {
    if (!this.props.ethprovider.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <div className="center">
          <h1 style={{ fontSize: "5vw"}}>Snowwy Wallet</h1>
          <button onClick={() => navigator.clipboard.writeText(window.account.address)} style={{ width: "55vw"}}>{window.account.address} <FontAwesomeIcon icon={faClipboard} /></button>
          <br />
          <h2><FontAwesomeIcon icon={faEthereum} /> {window.web3.utils.fromWei(this.state.balance.toString(), "ether")}</h2>
          <br />
          <br />
          <br />
          {this.props.ethprovider.state.ownedNFTS.length > 0 ? <h1>Owned Christmas Chads</h1> : <div><h1>you don't own any christmas chad nfts :P</h1><h2>checkout <a href="/mint">the minting page</a> to mint a christmas chad nft!</h2></div>}
          <br />
          {this.props.ethprovider.state.ownedNFTS.map(nft => {
            return (
            <div key={nft.tokenNumber}>
            <img style={{ width: "35%", borderRadius: "15%" }} src={nft.uri} key={`img#${nft.tokenNumber}`} alt={`Christmas Chads #${nft.tokenNumber}`} /> 
            </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;