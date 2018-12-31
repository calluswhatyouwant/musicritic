/* @flow */

import React, { Component } from 'react';
import { Track, PlayHistory, CurrentlyPlaying } from 'spotify-web-sdk';

import TrackCarousel from '../common/track/TrackCarousel';
import SocialButton from './../common/social-button/SocialButton';

import {
    getRecentlyPlayedTracks,
    getTopPlayedTracks,
    getCurrentUserCurrentlyPlayingTrack,
} from '../../api/SpotifyWebAPI';

import './UserPage.css';
import RecentTracksCarousel from '../common/track/RecentTracksCarousel';
import CurrentlyPlayingTrack from './CurrentlyPlayingTrack';

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

        getTopPlayedTracks().then(topTracks => this.setState({ topTracks }));
    }

    render() {
        const { history } = this.props;
        const { currentlyPlaying, recentTracks, topTracks } = this.state;

        if (localStorage.getItem('token')) {
            return (
                <div>
                    <h1 className="display-3">You are listening to</h1>
                    <CurrentlyPlayingTrack
                      history={history}
                      currentlyPlaying={currentlyPlaying}
                    />
                    <h1 className="display-3">Your recently played tracks</h1>
                    <RecentTracksCarousel
                      history={history}
                      tracks={recentTracks}
                    />
                    <h1 className="display-3">Your top played tracks</h1>
                    <TrackCarousel
                      history={history}
                      tracks={topTracks}
                    />
                </div>
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
