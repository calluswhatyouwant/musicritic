import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MediumEditor from 'medium-editor';
import { getTrack, Track } from 'spotify-web-sdk';

import {
    postTrackReview,
    updateTrackReview,
    getCurrentUserTrackReview,
} from '../../../api/TrackAPI';

import Rating from '../../common/rating/Rating';
import CustomPalette from '../../common/palette/CustomPalette';
import Loading from '../../common/loading/Loading';

import './TrackReviewPage.css';

const TrackReviewPage = () => {
    const [track, setTrack] = useState({});
    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState({
        createdAt: null,
        updatedAt: null,
        content: '',
    });
    const [rating, setRating] = useState(0);
    const [reviewId, setReviewId] = useState('');
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        async function getTrackFromAPI() {
            const trackResponse = await getTrack(id);
            const reviewResponse = await getCurrentUserTrackReview(id);
            console.log(reviewResponse);
            setTrack(trackResponse);
            setReviewId(reviewResponse.id);
            setRating(reviewResponse.rating);
            if (reviewResponse.review) {
                setReview(reviewResponse.review);
            }
            setLoading(false);
        }

        getTrackFromAPI();
    }, [id]);

    const handleSubmit = async () => {
        if (reviewId && reviewId.length > 0) {
            await updateTrackReview(id, reviewId, rating, review);
        } else {
            await postTrackReview(id, rating, review);
        }
        history.push(`/track/${id}`);
    };

    const handleCancel = () => {
        // TODO Open modal for confirmation
        history.push(`/track/${id}`);
    };

    return !loading ? (
        <>
            <TrackReviewPageHeader track={track} />
            <div className="album-page container">
                <h4>What did you think about this track?</h4>
                <ComposeReviewTextArea
                    review={review.review}
                    setReview={setReview}
                />
                <TrackReviewRating rating={rating} setRating={setRating} />
                <ReviewButtonBar
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            </div>
        </>
    ) : (
        <Loading />
    );
};

type RatingProps = {
    rating: number,
    setRating: (rating: number) => void,
};

const TrackReviewRating = ({ rating, setRating }: RatingProps) => (
    <div className="d-flex">
        <h4>Your score: </h4>
        <h4 className="pl-2">
            <Rating initialValue={rating} onValueChange={setRating} />
        </h4>
    </div>
);

type HeaderProps = {
    track: Track,
};

const TrackReviewPageHeader = ({ track }: HeaderProps) => (
    <CustomPalette imageUrl={track.album.imageUrl}>
        <div className="w-100 p-5">
            <div className="row">
                <div className="review-page-track-info col-md-8 text-center">
                    <h2 className="font-weight-bold text-center mb-4">
                        Write a review
                    </h2>
                    <h2>{track.name}</h2>
                    <h3>by {track.stringArtists}</h3>
                    <h3>from the album {track.album.name}</h3>
                </div>
                <div className="col-md-4 py-2">
                    <img
                        alt="Album"
                        className="track-page-header__cover w-50 shadow-lg"
                        src={track.album.imageUrl}
                    />
                </div>
            </div>
        </div>
    </CustomPalette>
);

type ButtonBarProps = {
    handleSubmit: () => void,
    handleCancel: () => void,
};

const ReviewButtonBar = ({ handleSubmit, handleCancel }: ButtonBarProps) => (
    <div className="d-flex flex-row-reverse pt-3">
        <button onClick={handleSubmit} className="btn btn-secondary">
            Submit Review
        </button>
        <button onClick={handleCancel} className="btn btn-tertiary">
            Cancel
        </button>
    </div>
);

type TextAreaProps = {
    review: {
        createdAt: Date | null,
        updatedAt: Date | null,
        content: string,
    },
    setReview: (review: string) => void,
};

const ComposeReviewTextArea = ({ review, setReview }: TextAreaProps) => {
    useEffect(() => {
        const editor = new MediumEditor('.editable');
        editor.subscribe('editableInput', event =>
            setReview({ ...review, content: event.target.innerHTML })
        );
    }, []);

    return (
        <textarea
            initialValue={review ? review.content : ''}
            className="editable">
            {review ? review.content : ''}
        </textarea>
    );
};

export default TrackReviewPage;
