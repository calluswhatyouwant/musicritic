import React, { Component } from 'react';

import TrackCard from '../../common/track/TrackCard';
import { Track } from '../../../spotify/models';

import './results.css';

class TrackResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: this.props.results.map(track => new Track(track)),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ tracks: nextProps.results.map(track => new Track(track)) });
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
