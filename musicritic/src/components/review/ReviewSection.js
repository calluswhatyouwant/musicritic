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
    reviews: Object,
};

const ReviewSection = ({ reviews }: ReviewSectionProps) => (
    <div className="review-section">
        <SectionHeader title="User Reviews">
            <ComposeReviewButton />
        </SectionHeader>
        <div className="reviews-wrapper">
            {reviews.map(review => (
                <ReviewCard key={review.id} {...review} />
            ))}
        </div>
    </div>
);

const ComposeReviewButton = () => {
    const handleClick = () => {};

    return (
        <button
            type="button"
            className="compose-review-button"
            onClick={handleClick}>
            Compose Review
        </button>
    );
};

type ReviewCardProps = {
    userName: string,
    userPhoto: string,
    rating: number,
    text: string,
    date: string,
};

const ReviewCard = ({
    userName,
    userPhoto,
    rating,
    text,
    date,
}: ReviewCardProps) => {
    const isLongReview = text.length > 500;
    const reviewDate = formatDate(date);

    const [displayedText, setDisplayedText] = useState(
        isLongReview ? `${text.substring(0, 497)}...` : text
    );

    const onShowMore = () => {
        setDisplayedText(text);
    };

    const onShowLess = () => {
        setDisplayedText(`${text.substring(0, 247)}...`);
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
                <span className="review-text">{displayedText}</span>
                {isLongReview && displayedText !== text && (
                    <button className="change-text-button" onClick={onShowMore}>
                        Show More
                    </button>
                )}
                {isLongReview && displayedText === text && (
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
