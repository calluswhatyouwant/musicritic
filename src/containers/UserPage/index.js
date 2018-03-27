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
        this.spotifyWebApi.getRecentlyPlayedTracks().then(tracks => {
            this.setState({...this.state, tracks: tracks.map(track => new Track(track.track))})
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
