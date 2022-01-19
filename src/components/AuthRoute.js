import React from "react"

import { Route } from "react-router-dom"

export default class AuthRoute extends React.Component {
    constructor(){
        super()
    }

    render() {
        if (window.ethereum != null){
            return <Route path={this.props.path} exact={this.props.exact || false} component={this.props.component} {...this.props} />
        } else {
            window.location = "/app"

            return <div>redirecting...</div>
        }
    }
}