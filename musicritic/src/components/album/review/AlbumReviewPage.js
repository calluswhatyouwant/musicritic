import React, { useState, useEffect } from 'react';
import MediumEditor from 'medium-editor';
import { getAlbum, Album } from 'spotify-web-sdk';
import { useParams, useHistory } from 'react-router-dom';

import CustomPalette from '../../common/palette/CustomPalette';
import Loading from '../../common/loading/Loading';
import Rating from '../../common/rating/Rating';
import {
    getCurrentUserAlbumReview,
    updateAlbumReview,
    postAlbumReview,
} from '../../../api/AlbumAPI';
import { FormattedMessage } from 'react-intl';

const AlbumReviewPage = () => {
    const [album, setAlbum] = useState({});
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState({
        createdAt: null,
        updatedAt: null,
        content: '',
    });
    const [reviewId, setReviewId] = useState('');
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        async function getAlbumFromAPI() {
            const albumResponse = await getAlbum(id);
            setAlbum(albumResponse);
            const reviewResponse = await getCurrentUserAlbumReview(id);
            setReviewId(reviewResponse.id);
            setRating(reviewResponse.rating);
            if (reviewResponse.review) {
                setReview(reviewResponse.review);
            }
            setLoading(false);
        }
        getAlbumFromAPI();
    }, [id]);

    const handleSubmit = async () => {
        if (reviewId && reviewId.length > 0) {
            await updateAlbumReview(id, reviewId, rating, review);
        } else {
            await postAlbumReview(id, rating, review);
        }
        history.push(`/album/${id}/`);
    };

    const handleCancel = () => {
        // TODO Open modal for confirmation
        history.push(`/album/${id}/`);
    };

    return !loading ? (
        <>
            <AlbumReviewPageHeader album={album} />
            <div className="album-page container">
                <h4>
                    <FormattedMessage id="write-review-cta" />
                </h4>
                <ComposeReviewTextArea review={review} setReview={setReview} />
                <AlbumReviewRating rating={rating} setRating={setRating} />
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

type HeaderProps = {
    album: Album,
};

const AlbumReviewPageHeader = ({ album }: HeaderProps) => (
    <CustomPalette imageUrl={album.images[0].url}>
        <div className="w-100 p-5">
            <div className="row">
                <div className="review-page-track-info col-md-8 text-center">
                    <h2 className="font-weight-bold text-center mb-4">
                        <FormattedMessage id="write-review" />
                    </h2>
                    <h4>
                        <FormattedMessage id="album" />
                    </h4>
                    <h2>{album.name}</h2>
                    <h3>
                        <FormattedMessage
                            id="by-artist"
                            values={{ artist: album.stringArtists }}
                        />
                    </h3>
                </div>
                <div className="col-md-4 py-2">
                    <img
                        alt="Album"
                        className="track-page-header__cover w-50 shadow-lg"
                        src={album.images[0].url}
                    />
                </div>
            </div>
        </div>
    </CustomPalette>
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
        const editor = new MediumEditor('.editable', {
            placeholder: { text: '' },
        });
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

type ButtonBarProps = {
    handleSubmit: () => void,
    handleCancel: () => void,
};

const ReviewButtonBar = ({ handleSubmit, handleCancel }: ButtonBarProps) => (
    <div className="d-flex flex-row-reverse pt-3">
        <button onClick={handleSubmit} className="btn btn-secondary">
            <FormattedMessage id="submit-review" />
        </button>
        <button onClick={handleCancel} className="btn btn-tertiary">
            <FormattedMessage id="cancel" />
        </button>
    </div>
);

type RatingProps = {
    rating: number,
    setRating: (rating: number) => void,
};

const AlbumReviewRating = ({ rating, setRating }: RatingProps) => (
    <div className="d-flex">
        <h4>
            <FormattedMessage id="your-score" />{' '}
        </h4>
        <h4 className="pl-2">
            <Rating initialValue={rating} onValueChange={setRating} />
        </h4>
    </div>
);

export default AlbumReviewPage;
