/* @flow */

import React, { Component } from 'react';

import TrackCard from '../../common/track/TrackCard';
import { Track } from '../../../spotify/models';

import './results.css';

type Props = {
    results: Array<any>;
};

type State = {
    tracks: Array<Track>;
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

    render() {
        const listResults = this.state.tracks.map((track, index) => (
            <div key={index} className="col-3 result">
                <TrackCard track={track} />
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
