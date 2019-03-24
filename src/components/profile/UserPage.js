/* @flow */

import React, { Component } from 'react';
import { Track, PlayHistory, CurrentlyPlaying } from 'spotify-web-sdk';

import {
    getRecentlyPlayedTracks,
    getTopPlayedTracks,
    getCurrentUserCurrentlyPlayingTrack,
} from '../../api/SpotifyWebAPI';

import CurrentlyPlayingTrackSection from './CurrentlyPlayingTrackSection';
import RecentTracksSection from './RecentTracksSection';
import TopTracksSection from './TopTracksSection';

import SocialButton from '../common/social-button/SocialButton';

import './UserPage.css';

type Props = {
    history: any,
};

type State = {
    currentlyPlaying: CurrentlyPlaying,
    recentTracks: PlayHistory[],
    topTracks: Track[],
};

class UserPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentlyPlaying: {},
            recentTracks: [],
            topTracks: [],
        };
    }

    componentDidMount() {
        getCurrentUserCurrentlyPlayingTrack().then(currentlyPlaying =>
            this.setState({ currentlyPlaying }));

        getRecentlyPlayedTracks().then(recentTracks =>
            this.setState({ recentTracks }));

        getTopPlayedTracks().then(topTracks =>
            this.setState({ topTracks }));
    }

    render() {
        const { history } = this.props;
        const { currentlyPlaying, recentTracks, topTracks } = this.state;

        if (localStorage.getItem('token')) {
            return (
                <React.Fragment>
                    <CurrentlyPlayingTrackSection
                      history={history}
                      currentlyPlaying={currentlyPlaying}
                    />
                    <TopTracksSection
                      history={history}
                      topTracks={topTracks}
                    />
                    <RecentTracksSection
                      history={history}
                      recentTracks={recentTracks}
                    />
                </React.Fragment>
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
