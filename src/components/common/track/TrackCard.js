import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';

import { Track } from '../../../spotify/models';

const TrackCard = ({track}) => (
    <div className="card text-center">
        <img className="card-img-top" src={track.album.imageUrl} />
        <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted text-truncate">{track.name}</h6>
            <p className="card-text text-truncate">{track.stringArtists}</p>
        </div>
    </div>
);

export default TrackCard;