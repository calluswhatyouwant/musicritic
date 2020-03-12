/* @flow */
import React, { useState, useEffect } from 'react';

import { getTrack } from '../../api/SpotifyWebAPI';

import TrackPageHeader from './TrackPageHeader';

const TrackPage = props => {
    const [track, setTrack] = useState({});

    useEffect(() => {
        async function getTrackFromAPI() {
            const trackResponse = await getTrack(props.match.params.id);
            setTrack(trackResponse);
        }

        getTrackFromAPI();
    }, []);

    return track.name ? <TrackPageHeader track={track} /> : <div />;
};

export default TrackPage;
