/* @flow */

import React from 'react';
import { Track } from 'spotify-web-sdk';

import './TrackCard.css';

type Props = {
    track: Track,
    handleClick: (track: Track) => void,
    rank?: number,
    relativeTime?: string,
};

const TrackCard = ({
    track, handleClick, rank, relativeTime,
}: Props) => {
    const clickableProps = {
        onClick: handleClick,
        tabIndex: 0,
        onKeyPress: () => {},
        role: 'button',
    };

    return (
        <div className="card" {...clickableProps}>
            <TrackCardTop track={track} rank={rank} />
            <TrackCardBody track={track} />
            {relativeTime && <TrackCardFooter relativeTime={relativeTime} />}
        </div>
    );
};

TrackCard.defaultProps = {
    rank: undefined,
    relativeTime: '',
};

type TrackCardTopProps = {
    track: Track,
    rank?: number,
};

const TrackCardTop = ({ track, rank }: TrackCardTopProps) => (
    <div className={rank ? 'track-card-top--with-rank' : ''}>
        <img
          className="track-card-top__img"
          src={track.album.images[0].url}
          alt={track.name}
        />
        <p className="track-card-top__rank text-light shadow">
            {rank}
        </p>
    </div>
);

TrackCardTop.defaultProps = {
    rank: undefined,
};

type TrackCardBodyProps = {
    track: Track,
};

const TrackCardBody = ({ track }: TrackCardBodyProps) => (
    <article className="card-body track-card-body">
        <h6 className="track-card-body__name card-subtitle text-truncate">
            {track.name}
        </h6>
        <p className="track-card-body__artists text-muted text-truncate">
            {track.stringArtists}
        </p>
    </article>
);

type TrackCardFooterProps = {
    relativeTime: string,
};

const TrackCardFooter = ({ relativeTime }: TrackCardFooterProps) => (
    <div className="track-card-footer card-footer text-muted">
        {relativeTime}
    </div>
);

export default TrackCard;
