import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getNextAlbumTrack, getPrevAlbumTrack } from '../../api/SpotifyWebAPI';

import TrackPageSidebar from './TrackPageSidebar';

import './TrackPage.css';
import ReviewSection from '../review/ReviewSection';
import Loading from '../common/loading/Loading';
import {
    getTrackReviews,
    getTrackAverageRating,
    getCurrentUserTrackReview,
    postTrackReview,
    getTrack as getTrackApi,
} from '../../api/TrackAPI';
import RatingModal, { useRatingModal } from '../common/rating/RatingModal';
import { useCurrentUser } from '../app/App';

const TrackPage = () => {
    const user = useCurrentUser();
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState({});
    const [averageRating, setAverageRating] = useState(0);
    const [track, setTrack] = useState({});
    const [reviews, setReviews] = useState([]);
    const [prevTrack, setPrevTrack] = useState({});
    const [nextTrack, setNextTrack] = useState({});
    const [chosenRating, setChosenRating] = useState(0);
    const { id } = useParams();
    const [
        isOpen,
        showConfirmationModal,
        postRating,
        cancelRating,
    ] = useRatingModal(
        id,
        chosenRating,
        rating,
        setChosenRating,
        postTrackReview
    );

    useEffect(() => {
        async function getTrackFromAPI() {
            const userLoggedIn = user && user !== 'unknown';
            const trackResponse = await getTrackApi(id);
            const {
                discNumber,
                trackNumber,
                album: { id: albumId },
            } = trackResponse;
            const prevTrackResponse = userLoggedIn
                ? await getPrevAlbumTrack(albumId, discNumber, trackNumber)
                : {};
            const nextTrackResponse = userLoggedIn
                ? await getNextAlbumTrack(albumId, discNumber, trackNumber)
                : {};
            const reviewsResponse = await getTrackReviews(id);
            if (userLoggedIn) {
                const userReview = await getCurrentUserTrackReview(id);
                const ratingResponse = userReview.rating;
                setReview(userReview.review);
                setRating(ratingResponse || 0);
            } else {
                setRating(undefined);
            }
            const avgRatingResponse = await getTrackAverageRating(id);

            setTrack(trackResponse);
            setAverageRating(avgRatingResponse);
            setPrevTrack(prevTrackResponse);
            setNextTrack(nextTrackResponse);
            setReviews(reviewsResponse);
            setLoading(false);
        }

        getTrackFromAPI();
    }, [id, user]);

    useEffect(() => {
        const updateAverageRating = async () => {
            const newAverageRating = await getTrackAverageRating(id);
            setAverageRating(newAverageRating);
        };

        updateAverageRating();
    }, [rating]);

    return !loading ? (
        <div className="row m-0">
            <div className="col-lg-4 p-0">
                <RatingModal
                    show={isOpen}
                    cancel={cancelRating}
                    rating={chosenRating}
                    ratingContent={track.name}
                    confirm={postRating}
                />
                <TrackPageSidebar
                    userRating={rating}
                    averageRating={averageRating}
                    postRating={showConfirmationModal}
                    track={track}
                    prevTrack={prevTrack}
                    nextTrack={nextTrack}
                />
            </div>
            <div className="col-lg-8">
                <ReviewSection
                    userLoggedIn={user && user !== 'unknown'}
                    userReview={!!review?.content}
                    redirectUrl={`/track/${id}/review`}
                    reviews={reviews}
                />
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default TrackPage;
