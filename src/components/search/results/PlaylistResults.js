/* @flow */

import React, { Component } from 'react';

import PlaylistCard from '../../common/playlist/PlaylistCard';
import Playlist from '../../../models/Playlist';

import './Results.css';

type Props = {
    results: Array<any>;
};

type State = {
    playlists: Array<Playlist>;
};

class PlaylistResult extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            playlists: this.props.results
                .map(playlist => new Playlist(playlist)),
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            playlists: nextProps.results
                .map(playlist => new Playlist(playlist)),
        });
    }

    render() {
        const listResults = this.state.playlists.map(playlist => (
            <div key={playlist.id} className="col-3 result">
                <PlaylistCard playlist={playlist} />
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
