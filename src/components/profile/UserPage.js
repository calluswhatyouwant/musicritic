import React, { Component } from 'react';

import SongCarousel from '../common/SongCarousel/SongCarousel';
import { Track } from '../../spotify/models';
import SpotifyWebApi from '../../spotify';
import ConnectButton from './../common/spotify/ConnectButton';

class UserPage extends Component {
    constructor (props) {
        super(props);
        this.spotifyWebApi = new SpotifyWebApi();
        this.state = {
            tracks: []
        }
    }

    componentWillMount() {
        this.spotifyWebApi.getRecentlyPlayedTracks().then(results => {
            const tracks = results.map(result => new Track(result.track));
            this.setState({ tracks: tracks })
        })
    }

    render() {
        if (localStorage.getItem('token')) {
            return <SongCarousel tracks={this.state.tracks} />;
        } else {
            return <SpotifyConnect />;
        }
    }
}

const SpotifyConnect = (props) => (
    <div className="text-center">
        <h1>Connect to Spotify:</h1>
        <ConnectButton urlToAuth={`${process.env.SERVER_BASE_URI}/auth/login`} />
    </div>
);

export default UserPage;
