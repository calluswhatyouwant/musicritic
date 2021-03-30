/* @flow */
import React, { Fragment } from 'react';

import CurrentlyPlayingTrackSection from './CurrentlyPlayingTrackSection';
import UserTracksSection from './UserTracksSection';

import HomePage from './HomePage';

import { init } from '../../api/SpotifyWebAPI';

import './UserPage.css';

const UserPage = () => {
    const spotifyToken = localStorage.getItem('spotifyToken');
    const spotifyRefreshToken = localStorage.getItem('spotifyRefresh');

    if (spotifyToken && spotifyRefreshToken) {
        init(spotifyToken, spotifyRefreshToken);
        return (
            <Fragment>
                <CurrentlyPlayingTrackSection />
                <UserTracksSection />
            </Fragment>
        );
    }

    return <HomePage />;
};

export default UserPage;
