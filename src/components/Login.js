import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

import "../css/theme.css"
import "../css/center.css"

export default class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: "",
            password: "",
            privateKey: "",
            usingPrivateKey: false,
            visible: false,
            error: "",
        }
    }

    render() {
        return (
            <div className='center'>
                <h1>Login to your Snowwy Wallet</h1>
                <br />
                <br />
                <br />
                {this.state.usingPrivateKey ?
                     (
                        <div>
                            <input style={{ width: "50vw", fontSize: "20px" }} type="text" placeholder='snowwy private key' value={this.state.privateKey} onChange={e => this.setState({ privateKey: e.target.value, error: "" })} />
                        </div>
                    )
                 : 
                     (
                        <div>
                            <input style={{ width: "50vw", fontSize: "25px" }} type='email' placeholder='snowwy email' value={this.state.email} onChange={e => this.setState({ email: e.target.value, error: "" })} />
                            <br />
                            <br />
                            <input id="pass" style={{ width: "50vw", fontSize: "25px" }} type={this.state.visible ? "text" : "password"} placeholder='snowwy password' value={this.state.password} onChange={e => this.setState({ password: e.target.value, error: "" })} />
                            <button className='nostyle' onClick={() => { this.setState({ visible: !this.state.visible }); document.getElementById("pass").type=this.state.visible ? "text" : "password"}}><FontAwesomeIcon icon={this.state.visible ? faEye : faEyeSlash} /></button>
                        </div>
                    )
                }
                <br />
                <br />
                <br />
                <p style={{ color: "red", fontSize: "20px" }}>{this.state.error}</p>
                <br />
                <button onClick={() => this.props.authprovider.loginAccount(this)}>Login</button>
                <br />
                <br />
                <button onClick={() => this.setState({ usingPrivateKey: !this.state.usingPrivateKey })} style={{ width: "35vw"}}>login using {this.state.usingPrivateKey ? "email and password" : "private key"}</button>
                <br />
                <br />
                <button onClick={() => window.location = "/account/create"} style={{ width: "40vw"}}>haven't got an account? create one now</button>
            </div>
        )
    }
}
