/* @flow */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getTrack } from '../../api/SpotifyWebAPI';
import TrackPageHeader from './TrackPageHeader';
import TrackPageBody from './TrackPageBody';

import './TrackPage.css';

const TrackPage = () => {
    const [track, setTrack] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function getTrackFromAPI() {
            const trackResponse = await getTrack(id);
            setTrack(trackResponse);
        }

        getTrackFromAPI();
    }, []);

    // TODO Use actual values
    return track.name ? <><TrackPageHeader track={track} /><TrackPageBody userRating={4} averageRating={3.5} /></> : null;
};

export default TrackPage;
