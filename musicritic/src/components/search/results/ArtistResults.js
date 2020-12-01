/* @flow */
import React, { useState, useEffect } from 'react';
import { Artist } from 'spotify-web-sdk';

import ArtistCard from '../../common/artist/ArtistCard';

import './Results.css';

type Props = {
    results: Artist[],
    history: any,
}

const ArtistResult = ({ results, history }: Props) => {
    const [artists, setArtists] = useState(results);

    useEffect(
        () => {
            setArtists(results);
        },
        [results]
    );

    const handleClick = artist => {
        history.push(`/artist/${artist.id}`);
    };

    const listResults = artists.map(artist => (
        <div key={artist.id} className="col-3 result">
            <ArtistCard handleClick={() => handleClick(artist)} artist={artist} />
        </div>
    ));
    return <div className="row">{listResults}</div>;
};

export default ArtistResult;
