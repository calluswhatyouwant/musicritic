/* @flow */

import React, { useState } from 'react';

import SectionHeader from '../common/section-header/SectionHeader';

import './ReviewSection.css';

const formatDate = (date: Date) => {
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

type Author = {
    displayName: string,
    avatarUrl: string,
    authorUid: string,
};

type Review = {
    id: string,
    author: Author,
    trackId: string,
    rating: number,
    review?: {
        createdAt: Date,
        updatedAt: Date,
        content: string,
    },
};

type ReviewSectionProps = {
    trackId: string,
    reviews: Array<Review>,
};

const ReviewSection = ({ trackId, reviews }: ReviewSectionProps) => (
    <div className="review-section">
        <SectionHeader title="User Reviews">
            <ComposeReviewButton trackId={trackId} />
        </SectionHeader>
        <div className="reviews-wrapper">
            {reviews
                .filter(review => review.review)
                .map(review => (
                    <ReviewCard key={review.id} {...review} />
                ))}
        </div>
    </div>
);

type ComposeReviewButtonProps = {
    trackId: string,
};

const ComposeReviewButton = ({ trackId }: ComposeReviewButtonProps) => (
    <a href={`/track/${trackId}/review`} className="compose-review-button">
        Compose Review
    </a>
);

type ReviewCardProps = {
    rating: number,
    author: Author,
    review: {
        createdAt: Date,
        updatedAt: Date,
        content: string,
    },
};

const ReviewCard = ({ rating, review, author }: ReviewCardProps) => {
    const isLongReview = review.content.length > 500;
    const reviewDate = review ? formatDate(review.updatedAt) : null;

    // TODO Adapt to work with HTML
    const [displayedText, setDisplayedText] = useState(
        isLongReview ? `${review.content.substring(0, 497)}...` : review.content
    );

    const onShowMore = () => {
        setDisplayedText(review.content);
    };

    const onShowLess = () => {
        setDisplayedText(`${review.content.substring(0, 247)}...`);
    };

    return (
        <div className="review-card">
            <div className="review-card-header">
                <div className="review-user-info">
                    <img
                        className="review-user-photo round-cropped"
                        src={author.avatarUrl}
                        alt={`${author.displayName}`}
                    />
                    <span className="review-user-name">
                        <span className="bold-text">{author.displayName}</span>{' '}
                        &apos;s review
                    </span>
                </div>
                <span className="review-rating">
                    Rated <span className="bold-text">{rating}</span>
                </span>
            </div>
            <div className="review-text-area">
                <span
                    dangerouslySetInnerHTML={{ __html: review.content }}
                    className="review-text"
                />
                {isLongReview && displayedText !== review.content && (
                    <button className="change-text-button" onClick={onShowMore}>
                        Show More
                    </button>
                )}
                {isLongReview && displayedText === review.content && (
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
