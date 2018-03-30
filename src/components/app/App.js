import React, { Component } from 'react';

import Navbar from './Navbar';
import MainContent from './MainContent';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <MainContent />
            </div>
        );
    }
}

export default App;
