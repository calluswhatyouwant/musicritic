import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
    getTrack,
    getNextAlbumTrack,
    getPrevAlbumTrack,
} from '../../api/SpotifyWebAPI';

import TrackPageSidebar from './TrackPageSidebar';

import './TrackPage.css';
import ReviewSection from '../review/ReviewSection';
import { getTrackReviews } from '../../api/TrackAPI';

const TrackPage = () => {
    const [loading, setLoading] = useState(true);
    const [track, setTrack] = useState({});
    const [reviews, setReviews] = useState([]);
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
            const prevTrackResponse = await getPrevAlbumTrack(
                albumId,
                discNumber,
                trackNumber
            );
            const nextTrackResponse = await getNextAlbumTrack(
                albumId,
                discNumber,
                trackNumber
            );
            const reviewsResponse = await getTrackReviews(id);
            
            setTrack(trackResponse);
            setPrevTrack(prevTrackResponse);
            setNextTrack(nextTrackResponse);
            setReviews(reviewsResponse);
            setLoading(false);
        }

        getTrackFromAPI();
    }, [id]);

    // TODO Use actual values
    return !loading ? (
        <div className="row album-page container">
            <div className="col-lg-4">
                <TrackPageSidebar
                    track={track}
                    prevTrack={prevTrack}
                    nextTrack={nextTrack}
                />
            </div>
            <div className="col-lg-8">
                <ReviewSection trackId={id} reviews={reviews} />
            </div>
        </div>
    ) : null;
};

export default TrackPage;
