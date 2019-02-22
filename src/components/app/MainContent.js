/* @flow */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ContainerizedRoute from './routes/ContainerizedRoute';

import LoginPage from '../login/LoginPage';
import UserPage from '../profile/UserPage';
import Auth from '../login/Auth';
import AlbumPage from '../album/AlbumPage';
import SearchResultsPage from '../search/SearchResultsPage';
import SignupPage from '../signup/SignupPage';
import TrackPage from '../track/TrackPage';

const MainContent = () => (
    <Switch>
        <ContainerizedRoute exact path="/" component={LoginPage} />
        <ContainerizedRoute exact path="/home" component={UserPage} />
        <ContainerizedRoute exact path="/signup" component={SignupPage} />
        <ContainerizedRoute
          exact
          path="/search/(tracks|artists|playlists|albums)/:query"
          component={SearchResultsPage}
        />
        <Route exact path="/auth/:token/:refresh" component={Auth} />
        <Route exact path="/album/:id/(reviews|)" component={AlbumPage} />
        <Route exact path="/track/:id" component={TrackPage} />
    </Switch>
);

export default MainContent;
