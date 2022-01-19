import React, { Component } from 'react'

import axios from "axios"

export default class AuthProvider extends Component {
    async registerAccount(self) {
        let response = await axios.post("http://localhost:80/account/create", {
            email: self.state.email,
            password: self.state.password
        })

        if(response.data.error){
            self.setState({error: response.data.error })
        } else {
            localStorage.setItem("snowwyaccount", JSON.stringify(response.data.account))
            window.location = "/app"
        }
    }

    async loginAccount(self){
        if(self.usingPrivateKey){
            this.loginAccountPK(self)
        } else {
            this.loginAccountEP(self)
        }
    }
    
    async loginAccountEP(self) {
        let response = await axios.post("http://localhost:80/account/get/ep", {
            email: self.state.email,
            password: self.state.password
        })

        console.log(response.data)

        if(response.data.error){
            self.setState({error: response.data.error })
        } else {
            localStorage.setItem("snowwyaccount", JSON.stringify(response.data.account))
            window.location = "/app"
        }
    }

    async loginAccountPK(self) {
        let response = await axios.post("http://localhost:80/account/get/pk", {
            privateKey: self.state.privateKey
        })

        if(response.data.error){
            self.setState({error: response.data.error })
        } else {
            localStorage.setItem("snowwyaccount", JSON.stringify(response.data.account))
            window.location = "/app"
        }
    }


    render() {
        let component = React.cloneElement(this.props.component, {...this.props.component.props, authprovider: this})
        return (
            <div>
                {component}
            </div>
        )
    }
}
