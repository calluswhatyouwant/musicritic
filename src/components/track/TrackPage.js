/* @flow */

import React, { Component } from 'react';
import { AudioFeatures, Track } from 'spotify-web-sdk';

import { getTrack, getAudioFeaturesForTrack } from '../../api/SpotifyWebAPI';

import TrackPageHeader from './TrackPageHeader';
import TrackPageBody from './TrackPageBody';

import './TrackPage.css';

type Props = {
    match: any,
};

type State = {
    audioFeatures: AudioFeatures,
    trackId: string,
    track: Track,
};

class TrackPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            trackId: this.props.match.params.id,
            track: {},
            audioFeatures: {},
        };
    }

    componentDidMount() {
        getTrack(this.state.trackId).then(track =>
            this.setState({ ...this.state, track })
        );

        getAudioFeaturesForTrack(this.state.trackId).then(audioFeatures =>
            this.setState({ ...this.state, audioFeatures })
        );
    }

    render() {
        const { track } = this.state;

        if (!track.name) return <div />;

        return (
            <div>
                <TrackPageHeader track={track} />
                <TrackPageBody userRating={4.5} averageRating={3.7} />
            </div>
        );
    }
}

export default TrackPage;
