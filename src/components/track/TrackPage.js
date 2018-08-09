/* @flow */

import React, { Component } from 'react';

import { Track, AudioFeatures } from '../../spotify/models';
import { getTrackInfo, getAudioFeatures } from '../../spotify';

import Header from './TrackPageHeader';
import Body from './TrackPageBody';

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
            track: new Track(),
            audioFeatures: new AudioFeatures(),
        };
    }

    componentWillMount() {
        getTrackInfo(this.state.trackId).then(trackJson => (
            this.setState({ ...this.state, track: new Track(trackJson) })
        ));

        getAudioFeatures(this.state.trackId).then(audioFeaturesJson => (
            this.setState({
                ...this.state,
                audioFeatures: new AudioFeatures(audioFeaturesJson),
            })
        ));
    }

    render() {
        const { track, audioFeatures } = this.state;

        if (!track.name) return <div />;

        return (
            <div>
                <Header track={track} />
                <Body
                  audioFeatures={audioFeatures}
                  userRating={4.5}
                  averageRating={3.7}
                />
            </div>
        );
    }
}

export default TrackPage;
