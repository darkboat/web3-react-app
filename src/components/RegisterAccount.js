import React, { Component } from 'react'

import "../css/theme.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

export default class RegisterAccount extends Component {
    constructor() {
        super()

        this.state = {
            email: "",
            password: "",
            visible: false,
            error: ""
        }
    }

    render() {
        return (
            <div className='center'>
                <h1>Register a Snowwy Wallet</h1>
                <br />
                <br />
                <br />
                <input style={{ width: "50vw"}} type='email' placeholder='email' value={this.state.email} onChange={e => this.setState({ email: e.target.value, error: "" })} />
                <br />
                <br />
                <input id="pass" style={{ width: "50vw"}} type={this.state.visible ? "text" : "password"} placeholder='password' value={this.state.password} onChange={e => this.setState({ password: e.target.value, error: "" })} />
                <button className='nostyle' onClick={() => {this.setState({visible: !this.state.visible}); document.getElementById("pass").type=this.state.visible ? "text" : "password"}}><FontAwesomeIcon icon={this.state.visible ? faEye : faEyeSlash} /></button>
                <br />
                <br />
                <br />
                <p style={{ color: "red", fontSize: "20px" }}>{this.state.error}</p>
                <br />
                <button onClick={() => this.props.authprovider.registerAccount(this)}>Register</button>
                <br />
                <br />
                <button onClick={() => window.location = "/account/login"} style={{ width: "40vw"}}>already have an account? login</button>
            </div>
        )
    }
}
