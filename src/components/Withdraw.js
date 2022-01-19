import React, { Component } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEthereum } from "@fortawesome/free-brands-svg-icons"

import "../css/theme.css"
import "../css/center.css"

export default class Withdraw extends Component {
    constructor() {
        super()

        this.state = {
            balance: 0,
            withdrawAmount: "",
            withdrawAddress: ""
        }
    }

    async componentDidMount(){
        let balance = await window.web3.eth.getBalance(window.account.address)
        balance = window.web3.utils.fromWei(balance, "ether")
        this.setState({ balance })
    }

    render() {
        return (
            <div className='center'>
                <h1>Withdraw Ethereum</h1>
                <br />
                <h2><FontAwesomeIcon icon={faEthereum} /> {this.state.balance}</h2>
                <br />
                <br />
                <br />
                <input style={{ width: "30vw" }} placeholder="withdraw amount" value={this.state.withdrawAmount} onChange={e => this.setState({ withdrawAmount: e.target.value })} />
                <p style={{ display: "inline", paddingLeft: "1vw", fontSize: "2vw", position: "absolute" }}>{this.state.balance - (isNaN(parseFloat(this.state.withdrawAmount)) ? 0 : parseFloat(this.state.withdrawAmount))} eth</p>
                <br />
                <br />
                <input style={{ width: "30vw" }} placeholder='withdraw address' value={this.state.withdrawAddress} onChange={e => this.setState({ withdrawAddress: e.target.value })} />
                <br />
                <br />
                <br />
                <br />
                <button style={{ display: "unset" }} onClick={() => this.props.ethprovider.withdrawEthereum(this.state.withdrawAddress, parseFloat(this.state.withdrawAmount))}>withdraw</button>
            </div>
        )
    }
}
