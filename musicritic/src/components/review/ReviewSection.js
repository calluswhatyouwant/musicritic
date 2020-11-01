/* @flow */

import React, { useState } from 'react';

import SectionHeader from '../common/section-header/SectionHeader';

import './ReviewSection.css';

const formatDate = (date: string) => {
    const daySuffixes = ['th', 'st', 'nd', 'rd'];
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const d = new Date(date);
    const month = monthNames[d.getMonth()];
    const daySuffix =
        d.getDate() < 3 ? daySuffixes[d.getDate()] : daySuffixes[0];

    return `${month} ${d.getDate()}${daySuffix}, ${d.getFullYear()}`;
};

type ReviewSectionProps = {
    trackId: string,
    reviews: Object,
};

const ReviewSection = ({ trackId, reviews }: ReviewSectionProps) => (
    <div className="review-section">
        <SectionHeader title="User Reviews">
            <ComposeReviewButton trackId={trackId} />
        </SectionHeader>
        <div className="reviews-wrapper">
            {reviews.map(review => (
                <ReviewCard key={review.id} {...review} />
            ))}
        </div>
    </div>
);

type ComposeReviewButtonProps = {
    trackId: string
}

const ComposeReviewButton = ({ trackId }: ComposeReviewButtonProps) => (
    <a href={`/track/${trackId}/review`} className="compose-review-button">
        Compose Review
    </a>
);

type ReviewCardProps = {
    userName: string,
    userPhoto: string,
    rating: number,
    review: string,
    date: string,
};

const ReviewCard = ({
    userName,
    userPhoto,
    rating,
    review,
    date,
}: ReviewCardProps) => {
    if (!review) return null;

    const isLongReview = review.length > 500;
    const reviewDate = formatDate(date);

    // TODO Adapt to work with HTML
    const [displayedText, setDisplayedText] = useState(
        isLongReview ? `${review.substring(0, 497)}...` : review
    );

    const onShowMore = () => {
        setDisplayedText(review);
    };

    const onShowLess = () => {
        setDisplayedText(`${review.substring(0, 247)}...`);
    };

    return (
        <div className="review-card">
            <div className="review-card-header">
                <div className="review-user-info">
                    <img
                        className="review-user-photo round-cropped"
                        src={userPhoto}
                        alt={`${userName}`}
                    />
                    <span className="review-user-name">
                        <span className="bold-text">{userName}</span> &apos;s
                        review
                    </span>
                </div>
                <span className="review-rating">
                    Rated <span className="bold-text">{rating}</span>
                </span>
            </div>
            <div className="review-text-area">
                <span dangerouslySetInnerHTML={{ __html: review }} className="review-text" />
                {isLongReview && displayedText !== review && (
                    <button className="change-text-button" onClick={onShowMore}>
                        Show More
                    </button>
                )}
                {isLongReview && displayedText === review && (
                    <button className="change-text-button" onClick={onShowLess}>
                        Show Less
                    </button>
                )}
            </div>
            <div className="review-details-info">
                <span className="review-date">{reviewDate}</span>
            </div>
        </div>
    );
};

export default ReviewSection;
