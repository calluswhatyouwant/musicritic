/* @flow */

import React from 'react';
import { AlbumSimplified } from 'spotify-web-sdk';

type Props = {
    album: AlbumSimplified,
    handleClick: (album: AlbumSimplified) => void,
    cardHeader?: React.ReactNode,
};

const AlbumCard = ({ album, handleClick, cardHeader }: Props) => {
    const clickableProps = {
        onClick: handleClick,
        tabIndex: 0,
        onKeyPress: () => {},
        role: 'button',
    };
    return (
        <div className="card" {...clickableProps}>
            {cardHeader}
            <img
                className="card-img-top"
                src={album.images[0].url}
                alt="Card top"
            />
            <div className="card-body text-center">
                <h6 className="card-subtitle mb-2 text-muted text-truncate">
                    {album.name}
                </h6>
                <p className="card-text text-truncate">{album.stringArtists}</p>
            </div>
        </div>
    );
};

export default AlbumCard;
