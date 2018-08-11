/* @flow */

import React from 'react';

import Album from '../../../models/Album';

type Props = {
    album: Album,
};

const AlbumCard = ({ album }: Props) => (
    <div className="card text-center">
        <img className="card-img-top" src={album.imageUrl} alt="Card top" />
        <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted text-truncate">
                {album.name}
            </h6>
            <p className="card-text">{album.stringArtists}</p>
        </div>
    </div>
);

export default AlbumCard;
