/* @flow */
import React, { useState, useEffect } from 'react';

import ArtistCard from '../../common/artist/ArtistCard';

import './Results.css';

const ArtistResult = ({ results }) => {
    const [artists, setArtists] = useState(results);

    useEffect(
        () => {
            setArtists(results);
        },
        [results]
    );

    const listResults = artists.map(artist => (
        <div key={artist.id} className="col-3 result">
            <ArtistCard artist={artist} />
        </div>
    ));
    return <div className="row">{listResults}</div>;
};

export default ArtistResult;
