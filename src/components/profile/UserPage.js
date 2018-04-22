import React, { Component } from 'react';

import SongCarousel from '../common/SongCarousel/SongCarousel';
import { Track } from '../../spotify/models';
import SpotifyWebApi from '../../spotify';
import SocialButton from './../common/SocialButton';

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
    <div className="row justify-content-center">
        <div className="col-sm-12 col-md-7 col-lg-5">
            <h1 className="text-center">Connect to Spotify:</h1>
            <SocialButton name="spotify" url={`${process.env.SERVER_BASE_URI}/auth/login`} />
        </div>
    </div>
);

export default UserPage;
