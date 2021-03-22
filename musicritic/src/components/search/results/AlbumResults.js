/* @flow */

import React, { useState, useEffect } from 'react';
import { AlbumSimplified } from 'spotify-web-sdk';

import AlbumCard from '../../common/album/AlbumCard';

import './Results.css';

type Props = {
    results: AlbumSimplified[],
    history: any,
};

const AlbumResult = ({ results, history }: Props) => {
    const [albums, setAlbums] = useState(results);

    useEffect(() => {
        setAlbums(results);
    }, [results]);

    const handleClick = album => {
        history.push(`/album/${album.id}/`);
    };

    const listResults = albums.map(album => (
        <div
            key={album.id}
            className="col-xl-2 col-lg-3 col-md-4 col-12 result">
            <AlbumCard album={album} handleClick={() => handleClick(album)} />
        </div>
    ));
    return <div className="row">{listResults}</div>;
};

export default AlbumResult;
