import React, { Component } from 'react';

import './app.css';

import Navbar from './Navbar';
import MainContent from './MainContent';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container main">
                    <MainContent />
                </div>
            </div>
        );
    }
}

export default App;
