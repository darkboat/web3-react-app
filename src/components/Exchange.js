import React from "react"

import "../css/center.css"
import "../css/theme.css"

export default class Exchange extends React.Component {
    state = {
        ethvalue: "0"
    }

    render() {
        return (
        <div className="center">
            <h1>Exchange eth for Candy Canes</h1>
            <input placeholder="eth value" value={this.state.ethvalue} onChange={e => this.setState({ ethvalue: e.target.value })} /> {(!isNaN(parseFloat(this.state.ethvalue))) ? parseFloat(this.state.ethvalue) * 1000 : 0} Candy Canes
            <br />
            <button onClick={() => this.props.ethprovider.exchangeEth(this.state.ethvalue)}>Exchange</button>
        </div>
        )
    }
}