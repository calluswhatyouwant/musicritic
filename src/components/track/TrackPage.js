/* @flow */

import React, { Component } from 'react';

import { Track } from '../../spotify/models';
import { getTrackInfo } from '../../spotify';

import './TrackPage.css';

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
            track: new Track(),
        };
    }

    componentWillMount() {
        getTrackInfo(this.state.trackId).then(trackJson => (
            this.setState({ ...this.state, track: new Track(trackJson) })
        ));
    }

    render() {
        const { track } = this.state;

        if (!track.name) return <div />;

        return (
            <Header track={track} />
        );
    }
}

type HeaderProps = {
    track: Track,
};

const Header = ({ track }: HeaderProps) => (
    <div className="header">
        <HeaderBackground imageUrl={track.album.imageUrl} />
        <HeaderContent track={track} />
    </div>
);

type HeaderBackgroundProps = {
    imageUrl: string,
};

const HeaderBackground = ({ imageUrl }: HeaderBackgroundProps) => {
    const style = {
        backgroundImage: `url(${imageUrl})`,
    };

    return (<div className="background" style={style} />);
};

const HeaderContent = ({ track }: HeaderProps) => (
    <div className="content">
        <img alt="Album" className="center-image" src={track.album.imageUrl} />
        <br />
        <TrackInfo track={track} />
    </div>
);

const getFormattedDuration = (durationInMillis: number) => {
    const minutes = Math.floor(durationInMillis / 60000);
    const seconds = Math.floor((durationInMillis % 60000) / 1000);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const TrackInfo = ({ track }: HeaderProps) => {
    const releaseYear = track.album.releaseDate.substring(0, 4);
    const duration = getFormattedDuration(track.durationInMillis);

    return (
        <div className="text-center">
            <h2>{ track.name }</h2>
            <h4>by { track.stringArtists }</h4>
            <p>
                { track.album.name } &bull; { releaseYear } &bull; { duration }
            </p>
        </div>
    );
};

export default TrackPage;
