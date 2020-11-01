import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MediumEditor from 'medium-editor';
import { getTrack } from 'spotify-web-sdk';

import { postTrackReview, updateTrackReview, getCurrentUserTrackReview } from '../../../api/TrackAPI';

import Rating from '../../common/rating/Rating';
import CustomPalette from '../../common/palette/CustomPalette';

import './TrackReviewPage.css';

const TrackReviewPage = () => {
  const [track, setTrack] = useState({});
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewId, setReviewId] = useState('');
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function getTrackFromAPI() {
      const trackResponse = await getTrack(id);
      const { rating, review, id: reviewId } = await getCurrentUserTrackReview(id);
      setReviewId(reviewId);
      setRating(rating);
      setReview(review);
      setTrack(trackResponse);
      setLoading(false);
    }

    getTrackFromAPI();
  }, [id]);

  const handleSubmit = async () => {
    if (reviewId.length > 0) {
      await updateTrackReview(id, reviewId, rating, review);
    } else {
      await postTrackReview(id, rating, review);
    }
    history.push(`/track/${id}`);
  }
  
  const handleCancel = () => {
    // TODO Open modal for confirmation
    history.push(`/track/${id}`);
  }

  return !loading && (
    <>
      <TrackReviewPageHeader track={track} />
      <div className="album-page container">
        <h4>What did you think about this track?</h4>
        <ComposeReviewTextArea review={review} setReview={setReview} />
        <TrackReviewRating rating={rating} setRating={setRating} />
        <ReviewButtonBar handleSubmit={handleSubmit} handleCancel={handleCancel} />
      </div>
    </>
  );
}

const TrackReviewRating = ({ rating, setRating }) => (
  <div className="d-flex">
    <h4>Your score: </h4>
    <h4 className="pl-2">
      <Rating initialValue={rating} onValueChange={setRating} />
    </h4>
  </div>
);

const TrackReviewPageHeader = ({ track }) => (
  <CustomPalette imageUrl={track.album.imageUrl}>
    <div className="w-100 p-5">
      <div className="row">
        <div className="review-page-track-info col-md-8 text-center">
          <h2 className="font-weight-bold text-center mb-4">Write a review</h2>
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

const ReviewButtonBar = ({ handleSubmit, handleCancel }) => (
  <div className="d-flex flex-row-reverse pt-3">
    <button onClick={handleSubmit} className="btn btn-secondary">
      Submit Review
    </button>
    <button onClick={handleCancel} className="btn btn-tertiary">
      Cancel
    </button>
  </div>
);

const ComposeReviewTextArea = ({ review, setReview }) => {
  useEffect(() => {
    const editor = new MediumEditor('.editable');
    editor.subscribe('editableInput', (event) => setReview(event.target.innerHTML));
  }, []);

  return (
    <textarea initialValue={review} className="editable">
      {review}
    </textarea>
  );
}

export default TrackReviewPage;
