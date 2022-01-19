import React from "react"

import "../css/navbar.css"
import "../css/theme.css"

export default class NavBar extends React.Component {

    render() {
        return (
            <div className="nav-bar">
                <button onClick={() => window.location = "/mint"}>Mint</button>
                <button onClick={() => window.location = "/credits"}>Credits</button>
                <button onClick={() => window.location = "/transfer"}>Transfer</button>
                <button onClick={() => window.location = "/withdraw"}>Withdraw</button>
                <button onClick={() => window.location = "/app"}>App</button>
            </div>
        )
    }
}