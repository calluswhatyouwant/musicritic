/* @flow */

import React, { Component } from 'react';

import TrackCard from '../../common/track/TrackCard';
import Track from '../../../models/Track';

import './Results.css';

type Props = {
    results: Array<any>,
    history: any,
};

type State = {
    tracks: Array<Track>,
};

class TrackResult extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            tracks: this.props.results.map(track => new Track(track)),
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            tracks: nextProps.results.map(track => new Track(track)),
        });
    }

    handleClick = (track: Track) => {
        this.props.history.push(`/track/${track.id}`);
    }

    render() {
        const listResults = this.state.tracks.map(track => (
            <div key={track.id} className="col-3 result">
                <TrackCard
                  track={track}
                  handleClick={() => this.handleClick(track)}
                />
            </div>
        ));
        return (
            <div className="row">
                {listResults}
            </div>
        );
    }
}

export default TrackResult;
