/* @flow */

import React from 'react';

import { Artist } from '../../../spotify/models';

type Props = {
    artist: Artist,
};

const ArtistCard = ({ artist }: Props) => (
    <div className="card text-center">
        <img className="card-img-top" src={artist.imageUrl} alt="Card top" />
        <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted text-truncate">
                {artist.name}
            </h6>
        </div>
    </div>
);

export default ArtistCard;
