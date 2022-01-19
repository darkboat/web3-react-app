import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom"

// Components
import RouterManager from "./components/RouterManager"

ReactDOM.render(
    <BrowserRouter>
        <RouterManager />
    </BrowserRouter>, 
    document.getElementById('root'));