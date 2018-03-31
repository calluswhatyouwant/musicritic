import React, { Component } from 'react';

import SongCarousel from '../common/SongCarousel/SongCarousel';
import { Track } from '../../spotify/models';
import SpotifyWebApi from '../../spotify';

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
        return (
            <SongCarousel tracks={this.state.tracks} />
        );
    }
}

export default UserPage;
