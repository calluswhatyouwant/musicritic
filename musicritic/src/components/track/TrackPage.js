/* @flow */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
    getTrack,
    getNextAlbumTrack,
    getPrevAlbumTrack,
} from '../../api/SpotifyWebAPI';

import TrackPageSidebar from './TrackPageSidebar';
import TrackPageBody from './TrackPageBody';

import './TrackPage.css';

const TrackPage = () => {
    const [loading, setLoading] = useState(true);
    const [track, setTrack] = useState({});
    const [prevTrack, setPrevTrack] = useState({});
    const [nextTrack, setNextTrack] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function getTrackFromAPI() {
            const trackResponse = await getTrack(id);
            const {
                discNumber,
                trackNumber,
                album: { id: albumId },
            } = trackResponse;
            const prevTrack = await getPrevAlbumTrack(
                albumId,
                discNumber,
                trackNumber
            );
            const nextTrack = await getNextAlbumTrack(
                albumId,
                discNumber,
                trackNumber
            );
            setTrack(trackResponse);
            setPrevTrack(prevTrack);
            setNextTrack(nextTrack);
            setLoading(false);
        }

        getTrackFromAPI();
    }, [id]);

    // TODO Use actual values
    return !loading ? (
        <div className="row album-page container">
            <div className="col-lg-6">
                <TrackPageSidebar
                    track={track}
                    prevTrack={prevTrack}
                    nextTrack={nextTrack}
                />
            </div>
            <div className="col-lg-6">
                <TrackPageBody />
            </div>
        </div>
    ) : null;
};

export default TrackPage;
