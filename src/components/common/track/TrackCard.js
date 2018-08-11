/* @flow */

import React from 'react';

import Track from '../../../models/Track';

type Props = {
    track: Track,
    handleClick: (track: Track) => void,
};

const TrackCard = ({ track, handleClick }: Props) => {
    const clickableProps = {
        onClick: handleClick,
        tabIndex: 0,
        onKeyPress: () => {},
        role: 'button',
    };

    return (
        <div className="card text-center" {...clickableProps}>
            <img
              className="card-img-top"
              src={track.album.imageUrl}
              alt="Top"
            />
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted text-truncate">
                    {track.name}
                </h6>
                <p className="card-text text-truncate">{track.stringArtists}</p>
            </div>
        </div>
    );
};

export default TrackCard;
