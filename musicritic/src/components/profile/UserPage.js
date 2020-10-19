/* @flow */
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
    getRecentlyPlayedTracks,
    getTopPlayedTracks,
} from '../../api/SpotifyWebAPI';

import CurrentlyPlayingTrackSection from './CurrentlyPlayingTrackSection';
import UserTracksSection from './UserTracksSection';

import SocialButton from '../common/social-button/SocialButton';

import './UserPage.css';
import { usePromise } from '../../utils/hooks';

const UserPage = () => {
    const [display, setDisplay] = useState('TOP');
    const [recentTracks] = usePromise(getRecentlyPlayedTracks(), [], []);
    const [topTracks] = usePromise(getTopPlayedTracks(), [], []);
    const history = useHistory();

    const handleClick = () => {
        setDisplay(display === 'TOP' ? 'RECENT' : 'TOP');
    };

    const tracks = display === 'TOP' ? topTracks : recentTracks;

    if (localStorage.getItem('spotifyToken')) {
        return (
            <Fragment>
                <CurrentlyPlayingTrackSection history={history} />
                <UserTracksSection
                    display={display}
                    history={history}
                    onClick={handleClick}
                    tracks={tracks}
                />
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
