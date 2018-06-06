/* @flow */

import React from 'react';

const TrackCard = ({ track }) => (
    <div className="card text-center">
        <img className="card-img-top" src={track.album.imageUrl} alt="Top" />
        <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted text-truncate">
                {track.name}
            </h6>
            <p className="card-text text-truncate">{track.stringArtists}</p>
        </div>
    </div>
);

export default TrackCard;
