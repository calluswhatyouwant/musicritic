/* @flow */

import React, { useEffect, useState } from 'react';

import PlaylistCard from '../../common/playlist/PlaylistCard';

import './Results.css';

const PlaylistResult = ({ results }) => {
    const [playlists, setPlaylists] = useState(results);

    useEffect(
        () => {
            setPlaylists(results);
        },
        [results]
    );

    const listResults = playlists.map(playlist => (
        <div key={playlist.id} className="col-3 result">
            <PlaylistCard playlist={playlist} />
        </div>
    ));
    return <div className="row">{listResults}</div>;
};

export default PlaylistResult;
