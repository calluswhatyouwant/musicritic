/* @flow */

import React, { Component } from 'react';
import { PlaylistSimplified } from 'spotify-web-sdk';

import PlaylistCard from '../../common/playlist/PlaylistCard';

import './Results.css';

type Props = {
    results: Array<PlaylistSimplified>,
};

type State = {
    playlists: Array<PlaylistSimplified>,
};

class PlaylistResult extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            playlists: this.props.results,
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            playlists: nextProps.results,
        });
    }

    render() {
        const listResults = this.state.playlists.map(playlist => (
            <div key={playlist.id} className="col-3 result">
                <PlaylistCard playlist={playlist} />
            </div>
        ));
        return <div className="row">{listResults}</div>;
    }
}

export default PlaylistResult;
