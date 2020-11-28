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
    getTrackAverageRating,
    getCurrentUserTrackReview,
    postTrackReview,
} from '../../api/TrackAPI';
import RatingModal from '../common/rating/RatingModal';

const TrackPage = () => {
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [track, setTrack] = useState({});
    const [reviews, setReviews] = useState([]);
    const [prevTrack, setPrevTrack] = useState({});
    const [nextTrack, setNextTrack] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [chosenRating, setChosenRating] = useState(0);
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
            const { rating: ratingResponse } = await getCurrentUserTrackReview(
                id
            );
            const avgRatingResponse = await getTrackAverageRating(id);

            setTrack(trackResponse);
            setRating(ratingResponse);
            setAverageRating(avgRatingResponse);
            setPrevTrack(prevTrackResponse);
            setNextTrack(nextTrackResponse);
            setReviews(reviewsResponse);
            setLoading(false);
        }

        getTrackFromAPI();
    }, [id]);

    useEffect(() => {
        const updateAverageRating = async () => {
            const newAverageRating = await getTrackAverageRating(id);
            setAverageRating(newAverageRating);
        };

        updateAverageRating();
    }, [rating]);
    
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const showConfirmationModal = (newRating: number) => {
        toggle()
        setChosenRating(newRating);
    }
   
    const postRating = () => {
       if (chosenRating !== rating) postTrackReview(id, chosenRating)
       toggle();
    };

    const cancelRating = () => {
        if (chosenRating !== rating) setChosenRating(rating);
        toggle();
    }
    

    // TODO Use actual values
    return !loading ? (
        <div className="row album-page container">
            <div className="col-lg-4">
                <RatingModal show={isOpen} cancel={cancelRating} rating={chosenRating} ratingContent={track.name} confirm={postRating}/>

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
                <ReviewSection redirectUrl={`/track/${id}/review`} reviews={reviews} />
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default TrackPage;
