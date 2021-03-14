/* @flow */

import React, { useState } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';

import SectionHeader from '../common/section-header/SectionHeader';

import './ReviewSection.css';

type Author = {
    displayName: string,
    avatarUrl: string,
    authorUid: string,
};

type ReviewSectionProps = {
    redirectUrl: string,
    reviews: Object,
};

const ReviewSection = ({ redirectUrl, reviews }: ReviewSectionProps) => {
    const reviewsWithText = reviews.filter(review => review.review && review.review.content);

    const title = reviewsWithText.length > 0 ? <FormattedMessage id="user-reviews" /> : <FormattedMessage id="no-reviews" />;
    return (
        <div className="review-section">
            <SectionHeader title={title}>
                <ComposeReviewButton redirectUrl={redirectUrl} />
            </SectionHeader>
            <div className="reviews-wrapper">
                {reviewsWithText
                    .map(review => (
                        <ReviewCard key={review.id} {...review} />
                    ))}
            </div>
        </div>
    )
}

type ComposeReviewButtonProps = {
    redirectUrl: string
}

const ComposeReviewButton = ({ redirectUrl }: ComposeReviewButtonProps) => (
    <a href={redirectUrl} className="compose-review-button">
        <FormattedMessage id="compose-review" />
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
                        <FormattedMessage id="user-review" values={{ author: <span className="bold-text">{author.displayName}</span> }} />
                    </span>
                </div>
                <span className="review-rating">
                    {rating} <i className="fas fa-star" />
                </span>
            </div>
            <div className="review-text-area">
                <span
                    dangerouslySetInnerHTML={{ __html: review.content }}
                    className="review-text"
                />
                {isLongReview && displayedText !== review.content && (
                    <button className="change-text-button" onClick={onShowMore}>
                        <FormattedMessage id="show-more" />
                    </button>
                )}
                {isLongReview && displayedText === review.content && (
                    <button className="change-text-button" onClick={onShowLess}>
                        <FormattedMessage id="show-less" />
                    </button>
                )}
            </div>
            <div className="review-details-info">
                <span className="review-date">
                    <FormattedDate
                        value={review.updatedAt}
                        year="numeric"
                        month="long"
                        day="numeric"
                    />
                </span>
            </div>
        </div>
    );
};

export default ReviewSection;
