/* @flow */
import React, { useState, useEffect } from 'react';
import { Track } from 'spotify-web-sdk';

import TrackCard from '../../common/track/TrackCard';

import './Results.css';

type Props = {
    results: Track[],
    history: any,
};

const TrackResult = ({ results, history }: Props) => {
    const [tracks, setTracks] = useState();

    useEffect(() => {
        setTracks(results);
    }, [results]);

    function handleClick(track) {
        history.push(`/track/${track.id}`);
    }

    const listResults =
        tracks &&
        tracks.map(track => (
            <div key={track.id} className="col-3 result">
                <TrackCard
                    track={track}
                    handleClick={() => handleClick(track)}
                />
            </div>
        ));

    return <div className="row">{listResults}</div>;
};

export default TrackResult;
