/* @flow */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ContainerizedRoute from './routes/ContainerizedRoute';
import ProtectedRoute from './routes/ProtectedRoute';

import UserPage from '../profile/UserPage';
import Auth from '../login/Auth';
import AlbumPage from '../album/AlbumPage';
import SearchResultsPage from '../search/SearchResultsPage';
import SignupPage from '../signup/SignupPage';
import TrackPage from '../track/TrackPage';
import TrackReviewPage from '../track/review/TrackReviewPage';
import AlbumReviewPage from '../album/review/AlbumReviewPage';
import ArtistPage from '../artist/ArtistPage';

const MainContent = () => (
    <Switch>
        <ContainerizedRoute exact path="/">
            <UserPage />
        </ContainerizedRoute>
        <ContainerizedRoute exact path="/home">
            <UserPage />
        </ContainerizedRoute>
        <ContainerizedRoute exact path="/signup">
            <SignupPage />
        </ContainerizedRoute>
        <ContainerizedRoute
            exact
            path="/search/(tracks|artists|playlists|albums)/:query">
            <SearchResultsPage />
        </ContainerizedRoute>
        <Route
            exact
            path="/auth/:token/:refresh/:musicritic"
            component={Auth}
        />
        <ProtectedRoute exact path="/album/:id/(reviews|)">
            <AlbumPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/track/:id">
            <TrackPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/track/:id/review">
            <TrackReviewPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/album/:id/review">
            <AlbumReviewPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/artist/:id/">
            <ArtistPage />
        </ProtectedRoute>
    </Switch>
);

export default MainContent;
