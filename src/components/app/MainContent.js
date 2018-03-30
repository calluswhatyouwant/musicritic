import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from '../login/LoginPage';
import UserPage from '../profile/UserPage';
import Auth from '../login/Auth';
import SearchResultsPage from '../search/SearchResultsPage';

class MainContent extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={LoginPage} />
                <Route exact path='/home' component={UserPage} />
                <Route path='/auth/:token/:refresh' component={Auth} />
                <Route path='/search/:type/:query' component={SearchResultsPage} />
            </Switch>
        );
    }
}

export default MainContent;
