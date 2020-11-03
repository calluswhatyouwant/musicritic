/* @flow */
import React, { Fragment } from 'react';

import CurrentlyPlayingTrackSection from './CurrentlyPlayingTrackSection';
import UserTracksSection from './UserTracksSection';

import SocialButton from '../common/social-button/SocialButton';
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

    return <SpotifyConnect />;
};

const SpotifyConnect = () => {
    const serverBaseUri = process.env.SERVER_BASE_URL || '';

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-7 col-lg-5">
                <h1 className="text-center">Connect to Spotify:</h1>
                <SocialButton
                    name="spotify"
                    url={`${serverBaseUri}/auth/login`}
                />
            </div>
        </div>
    );
};

export default UserPage;
