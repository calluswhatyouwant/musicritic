/* @flow */

import React, { Component } from 'react';

import AudioFeatures from '../../models/AudioFeatures';
import Track from '../../models/Track';
import { getTrackInfo, getAudioFeatures } from '../../api/SpotifyWebAPI';

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
            track: new Track(),
            audioFeatures: new AudioFeatures(),
        };
    }

    componentDidMount() {
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
                <TrackPageHeader track={track} />
                <TrackPageBody
                  audioFeatures={audioFeatures}
                  userRating={4.5}
                  averageRating={3.7}
                />
            </div>
        );
    }
}

export default TrackPage;
