/* @flow */

import React, { Component, Fragment } from 'react';
import { Track, PlayHistory } from 'spotify-web-sdk';

import {
    getRecentlyPlayedTracks,
    getTopPlayedTracks,
} from '../../api/SpotifyWebAPI';

import CurrentlyPlayingTrackSection from './CurrentlyPlayingTrackSection';
import UserTracksSection from './UserTracksSection';

import SocialButton from '../common/social-button/SocialButton';

import './UserPage.css';

type Props = {
    history: any,
};

type State = {
    display: 'TOP' | 'RECENT',
    recentTracks: PlayHistory[],
    topTracks: Track[],
};

class UserPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            display: 'TOP',
            recentTracks: [],
            topTracks: [],
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        getRecentlyPlayedTracks().then(recentTracks =>
            this.setState({ recentTracks }));

        getTopPlayedTracks().then(topTracks =>
            this.setState({ topTracks }));
    }

    handleClick = () => {
        const invertDisplay = (this.state.display === 'TOP' ? 'RECENT' : 'TOP');
        this.setState({ display: invertDisplay });
    }

    render() {
        const { history } = this.props;
        const {
            display, recentTracks, topTracks,
        } = this.state;
        const tracks = (display === 'TOP' ? topTracks : recentTracks);

        if (localStorage.getItem('token')) {
            return (
                <Fragment>
                    <CurrentlyPlayingTrackSection
                      history={history}
                    />
                    <UserTracksSection
                      display={display}
                      history={history}
                      onClick={this.handleClick}
                      tracks={tracks}
                    />
                </Fragment>
            );
        }
        return <SpotifyConnect />;
    }
}


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
