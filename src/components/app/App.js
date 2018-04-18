import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import './app.css';

import Navbar from './Navbar';
import MainContent from './MainContent';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <ToastContainer />
                <div className="container main">
                    <MainContent />
                </div>
            </div>
        );
    }
}

export default App;
