import React, {Component} from 'react';
import SongCarousel from '../../components/SongCarousel';
import {Track} from '../../spotify/models';

class UserPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            tracks: [] //TODO Request the user's recently played tracks
        }
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
