/* @flow */

import React, { useState, useEffect } from 'react';

import AlbumCard from '../../common/album/AlbumCard';

import './Results.css';

const AlbumResult = ({ results, history }) => {
    const [albums, setAlbums] = useState(results);

    useEffect(
        () => {
            setAlbums(results);
        },
        [results]
    );

    const handleClick = album => {
        history.push(`/album/${album.id}/`);
    };

    const listResults = albums.map(album => (
        <div key={album.id} className="col-3 result">
            <AlbumCard album={album} handleClick={() => handleClick(album)} />
        </div>
    ));
    return <div className="row">{listResults}</div>;
};

export default AlbumResult;
