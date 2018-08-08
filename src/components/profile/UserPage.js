/* @flow */

import React, { Component } from 'react';

import SongCarousel from '../common/SongCarousel/SongCarousel';
import SocialButton from './../common/SocialButton';

import { Track } from '../../spotify/models';
import { getRecentlyPlayedTracks, getTopPlayedTracks } from '../../spotify';

import './UserPage.css';

type Props = {

};

type State = {
    recentTracks: Array<Track>,
    topTracks: Array<Track>,
};

class UserPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            recentTracks: [],
            topTracks: [],
        };
    }

    componentWillMount() {
        getRecentlyPlayedTracks().then((results) => {
            const recentTracks = results
                .map(result => new Track(result.track));
            this.setState({ ...this.state, recentTracks });
        });

        getTopPlayedTracks().then((results) => {
            const topTracks = results
                .map(result => new Track(result));
            this.setState({ ...this.state, topTracks });
        });
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <div className="text-center">
                    <h1>Recently played tracks</h1>
                    <SongCarousel tracks={this.state.recentTracks} />
                    <h1>Top played tracks</h1>
                    <SongCarousel tracks={this.state.topTracks} />
                </div>
            );
        }
        return <SpotifyConnect />;
    }
}

const SpotifyConnect = () => {
    const serverBaseUri = process.env.SERVER_BASE_URI || '';

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
