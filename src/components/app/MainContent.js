import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from '../login/LoginPage';
import UserPage from '../profile/UserPage';
import Auth from '../login/Auth';
import SearchResultsPage from '../search/SearchResultsPage';
import SignupPage from '../signup/SignupPage';

class MainContent extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/home" component={UserPage} />
                <Route exact path="/signup" component={SignupPage} />
                <Route exact path="/auth/:token/:refresh" component={Auth} />
                <Route exact path="/search/(tracks|artists|playlists|albums)/:query" component={SearchResultsPage} />
            </Switch>
        );
    }
}

export default MainContent;
