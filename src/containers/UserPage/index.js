import React, {Component} from 'react';

import SongCarousel from '../../components/SongCarousel';
import {Track} from '../../spotify/models';
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
            <div className="container">
                <SongCarousel tracks={this.state.tracks} />
            </div>
        );
    }
}

export default UserPage;
