/* @flow */
import React, { useState, useEffect } from 'react';
import { Artist } from 'spotify-web-sdk';

import ArtistCard from '../../common/artist/ArtistCard';

type Props = {
    results: Artist[],
    history: any,
};

const ArtistResult = ({ results, history }: Props) => {
    const [artists, setArtists] = useState(results);

    useEffect(() => {
        setArtists(results);
    }, [results]);

    const handleClick = artist => {
        history.push(`/artist/${artist.id}`);
    };

    const listResults = artists
        .filter(artist => artist.images[0])
        .map(artist => (
            <div key={artist.id}>
                <ArtistCard
                    handleClick={() => handleClick(artist)}
                    artist={artist}
                />
            </div>
        ));
    return <div className="card-columns p-2 p-sm-5 mx-0">{listResults}</div>;
};

export default ArtistResult;
