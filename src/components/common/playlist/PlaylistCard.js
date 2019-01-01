/* @flow */

import React from 'react';
import { PlaylistSimplified } from 'spotify-web-sdk';

type Props = {
    playlist: PlaylistSimplified,
};

const PlaylistCard = ({ playlist }: Props) => (
    <div className="card text-center">
        <img className="card-img-top" src={playlist.images[0].url} alt="Play" />
        <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted text-truncate">
                {playlist.name}
            </h6>
            <p className="card-text">{playlist.owner.displayName}</p>
        </div>
    </div>
);

export default PlaylistCard;
