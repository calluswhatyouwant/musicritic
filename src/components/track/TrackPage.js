/* @flow */

import React, { Component } from 'react';
import { Track } from 'spotify-web-sdk';

import { getTrack } from '../../api/SpotifyWebAPI';

import TrackPageHeader from './TrackPageHeader';

type Props = {
    match: any,
};

type State = {
    trackId: string,
    track: Track,
};

class TrackPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            trackId: this.props.match.params.id,
            track: {},
        };
    }

    componentDidMount() {
        getTrack(this.state.trackId).then((track) => {
            this.setState({ track });
        });
    }

    render() {
        const { track } = this.state;

        if (!track.name) return <div />;

        return (
            <TrackPageHeader track={track} />
        );
    }
}

export default TrackPage;
