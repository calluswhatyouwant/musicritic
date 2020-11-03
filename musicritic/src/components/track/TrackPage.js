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
import Loading from '../common/loading/Loading';
import {
    getTrackReviews,
    getCurrentUserTrackReview,
    postTrackReview
} from '../../api/TrackAPI';

const TrackPage = () => {
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
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
            const { rating: ratingResponse } = await getCurrentUserTrackReview(id);

            setTrack(trackResponse);
            setRating(ratingResponse);
            setPrevTrack(prevTrackResponse);
            setNextTrack(nextTrackResponse);
            setReviews(reviewsResponse);
            setLoading(false);
        }

        getTrackFromAPI();
    }, [id]);

    const postRating = (newRating: number) => { 
        if (newRating !== rating) postTrackReview(id, newRating);
    }

    // TODO Use actual values
    return !loading ? (
        <div className="row album-page container">
            <div className="col-lg-4">
                <TrackPageSidebar
                    userRating={rating}
                    postRating={postRating}
                    track={track}
                    prevTrack={prevTrack}
                    nextTrack={nextTrack}
                />
            </div>
            <div className="col-lg-8">
                <ReviewSection trackId={id} reviews={reviews} />
            </div>
        </div>
    ) : <Loading />;
};

export default TrackPage;
