/* @flow */

import React, { useState, useEffect } from 'react';
import { AlbumSimplified } from 'spotify-web-sdk';

import AlbumCard from '../../common/album/AlbumCard';

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
        <div key={album.id}>
            <AlbumCard album={album} handleClick={() => handleClick(album)} />
        </div>
    ));
    return <div className="card-columns p-2 p-sm-5 mx-0">{listResults}</div>;
};

export default AlbumResult;
