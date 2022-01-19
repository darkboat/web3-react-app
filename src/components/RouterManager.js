import React from "react"

import { Route, Routes, Navigate } from "react-router-dom"

// Components
import Mint from './Mint'
import App from "./App"
import EthProvider from "./EthProvider"
import NavBar from "./NavBar"
import Credits from "./Credits"
import Exchange from "./Exchange"
import Login from "./Login"
import RegisterAccount from "./RegisterAccount"
import AuthProvider from "./AuthProvider"
import Withdraw from "./Withdraw"

export default function RouterManager() {
    return (
        <div>
            <NavBar />
            <br />
            <br />
            <Routes>
                <Route path="/app" exact element={<EthProvider component={<App />} />} />
                <Route path="/mint" exact element={<EthProvider component={<Mint />} />} />
                <Route path="/mint/view/:tokenId" element={<EthProvider component={<Mint />} />} />
                <Route path="/exchange" element={<EthProvider component={<Exchange />} />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="/account/login" element={<AuthProvider component={<Login />} />} />
                <Route path="/account/create" element={<AuthProvider component={<RegisterAccount />} />} />
                <Route path="/withdraw" element={<EthProvider component={<Withdraw />} />} />

                <Route path="/*" element={<Navigate to="/app" />}/>
            </Routes>
            <br />
            <br />
            <br />
        </div>
    )
}