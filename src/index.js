/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './components/app/App';

const root = document.getElementById('root');

if (root) {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        root,
    );
}

