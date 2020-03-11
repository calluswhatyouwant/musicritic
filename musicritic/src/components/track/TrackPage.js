/* @flow */
import React, { useState, useEffect } from 'react';

import { getTrack } from '../../api/SpotifyWebAPI';

import TrackPageHeader from './TrackPageHeader';

const TrackPage = props => {
    const [track, setTrack] = useState({});

    useEffect(() => {
        getTrackFromAPI();
    }, []);

    async function getTrackFromAPI() {
        const track = await getTrack(props.match.params.id);
        setTrack(track);
    }

    return track.name ? <TrackPageHeader track={track} /> : <div />;
};

export default TrackPage;
