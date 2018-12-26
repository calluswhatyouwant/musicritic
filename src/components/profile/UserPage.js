/* @flow */

import React, { Component } from 'react';
import { Track, PlayHistory } from 'spotify-web-sdk';

import TrackCarousel from '../common/track/TrackCarousel';
import SocialButton from './../common/social-button/SocialButton';

import {
    getRecentlyPlayedTracks,
    getTopPlayedTracks,
} from '../../api/SpotifyWebAPI';

import './UserPage.css';
import RecentTracksCarousel from '../common/track/RecentTracksCarousel';

type Props = {
    history: any,
};

type State = {
    recentTracks: PlayHistory[],
    topTracks: Track[],
};

class UserPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            recentTracks: [],
            topTracks: [],
        };
    }

    componentDidMount() {
        getRecentlyPlayedTracks().then(recentTracks =>
            this.setState({ recentTracks })
        );

        getTopPlayedTracks().then(topTracks => this.setState({ topTracks }));
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <div className="">
                    <h1>Your recently played tracks</h1>
                    <RecentTracksCarousel
                        history={this.props.history}
                        tracks={this.state.recentTracks}
                    />
                    <h1>Your top played tracks</h1>
                    <TrackCarousel
                        history={this.props.history}
                        tracks={this.state.topTracks}
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
