import React, { Component } from 'react';

import PlaylistCard from '../../common/playlist/PlaylistCard';
import { Playlist } from '../../../spotify/models';

import './results.css';

class PlaylistResult extends Component {
    constructor(props) {
        super(props);      
        this.state = {
            playlists: this.props.results.map(playlist => {
                return new Playlist(playlist)
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({playlists: nextProps.results.map(playlist => {
            return new Playlist(playlist)
        })});
    }
    
    render() {
        const listResults = this.state.playlists.map((playlist, index) => (
            <div key={index} className="col-3 result">
                <PlaylistCard playlist={playlist}/>
            </div>
        ));
        return (
            <div className="row">
                {listResults}
            </div>
        );
    }
}

export default PlaylistResult;