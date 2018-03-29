import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import LoginPage from '../LoginPage';
import UserPage from '../UserPage';
import Auth from '../Auth';
import SearchResultsPage from '../SearchResultsPage';

class MainContent extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={LoginPage} />
                    <Route exact path='/home' component={UserPage} />
                    <Route path='/auth/:token/:refresh' component={Auth} />
                    <Route path='/search/:type/:query' component={SearchResultsPage} />
                </Switch>
            </div>
        );
    }
}

export default MainContent;
