/* @flow */

import React, { Component } from 'react';
import moment from 'moment';
import { PlayHistory, Track } from 'spotify-web-sdk';

type Props = {
    playHistory: PlayHistory,
    handleClick: (track: Track) => void,
};

type State = {
    contextObject: any,
};

class RecentTrackCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            contextObject: {},
        };
    }

    componentDidMount() {
        this.props.playHistory
            .getContextData()
            .then(contextObject => this.setState({ contextObject }));
    }

    getRelativeTime() {
        return moment(this.props.playHistory.playedAt).fromNow();
    }

    render() {
        const { handleClick } = this.props;
        const clickableProps = {
            onClick: handleClick,
            tabIndex: 0,
            onKeyPress: () => {},
            role: 'button',
        };

        const { playedAt, track } = this.props.playHistory;
        const { contextObject } = this.state;

        return (
            <div className="card text-center" {...clickableProps}>
                <img
                    className="card-img-top"
                    src={track.album.imageUrl}
                    alt="Album cover"
                />
                <RecentTrackCardBody
                    contextObject={contextObject}
                    track={track}
                />
                <div className="card-footer text-muted">
                    {this.getRelativeTime(playedAt)}
                </div>
            </div>
        );
    }
}

type CardBodyProps = {
    contextObject: any,
    track: Track,
};

const RecentTrackCardBody = ({ contextObject, track }: CardBodyProps) => (
    <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted text-truncate">
            {track.name}
        </h6>
        <p className="card-text text-truncate">{track.stringArtists}</p>
        <p className="card-text text-muted text-truncate">
            {`From the ${contextObject.type}`}
            <i>{` ${contextObject.name}`}</i>
        </p>
    </div>
);

export default RecentTrackCard;
