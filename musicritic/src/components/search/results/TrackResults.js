/* @flow */
import React, { useState, useEffect } from 'react';

import TrackCard from '../../common/track/TrackCard';

import './Results.css';

const TrackResult = ({ results, history }) => {
    const [tracks, setTracks] = useState();

    useEffect(
        () => {
            setTracks(results);
        },
        [results]
    );

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
