import React from "react"

import "../css/theme.css"
import "../css/href.css"
import "../css/credits.css"

export default class Credits extends React.Component {
    render() {
        return (
            <div className="credits">
                <div className="artist credititem">
                    <h1>Gangster Penguins Artist</h1>
                    <h2>discord: Satfoun#0329</h2>
                    <h2>check out his artwork on his <a href="https://satfoun.artstation.com/">artstation</a></h2>
                </div>
                <br />
                <div className="programmer credititem">
                    <h1>Lead Programmer</h1>
                    <h2>discord: hmm..#4417</h2>
                </div>
            </div>
        )
    }
}