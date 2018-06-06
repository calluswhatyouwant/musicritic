import React from 'react';
import { ToastContainer } from 'react-toastify';

import './app.css';

import Navbar from './Navbar';
import MainContent from './MainContent';

const App = () => (
    <div>
        <Navbar />
        <ToastContainer />
        <div className="container main">
            <MainContent />
        </div>
    </div>
);

export default App;
