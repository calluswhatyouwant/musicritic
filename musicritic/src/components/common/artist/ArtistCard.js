/* @flow */

import React from 'react';
import { Artist } from 'spotify-web-sdk';

type Props = {
    artist: Artist,
};

const ArtistCard = ({ artist }: Props) => (
    <div className="card text-center">
        <img
          className="card-img-top"
          src={artist.images[0] ? artist.images[0].url : ''}
          alt="Artist"
        />
        <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted text-truncate">
                {artist.name}
            </h6>
        </div>
    </div>
);

export default ArtistCard;
