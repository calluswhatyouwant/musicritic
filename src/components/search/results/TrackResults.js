/* @flow */

import React, { Component } from 'react';
import { Track } from 'spotify-web-sdk';

import TrackCard from '../../common/track/TrackCard';

import './Results.css';

type Props = {
    results: Track[],
    history: any,
};

type State = {
    tracks: Track[],
};

class TrackResult extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            tracks: this.props.results,
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            tracks: nextProps.results,
        });
    }

    handleClick = (track: Track) => {
        this.props.history.push(`/track/${track.id}`);
    };

    render() {
        const listResults = this.state.tracks.map(track => (
            <div key={track.id} className="col-3 result">
                <TrackCard
                    track={track}
                    handleClick={() => this.handleClick(track)}
                />
            </div>
        ));
        return <div className="row">{listResults}</div>;
    }
}

export default TrackResult;
