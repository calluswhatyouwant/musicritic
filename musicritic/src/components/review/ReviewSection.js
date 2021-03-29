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
    userLoggedIn: boolean,
    userReview: boolean,
    redirectUrl: string,
    reviews: Object,
};

const ReviewSection = ({
    userLoggedIn,
    userReview,
    redirectUrl,
    reviews,
}: ReviewSectionProps) => {
    const reviewsWithText = reviews.filter(
        review => review.review && review.review.content
    );

    const title = <FormattedMessage id="user-reviews" />;

    return (
        <div className="review-section p-2 p-sm-4">
            {userLoggedIn && !userReview && (
                <EmptyState redirectUrl={redirectUrl} />
            )}
            {reviewsWithText.length > 0 && (
                <SectionHeader title={title}>
                    {userReview && (
                        <ComposeReviewButton
                            redirectUrl={redirectUrl}
                            userReview={userReview}
                        />
                    )}
                </SectionHeader>
            )}
            <div className="reviews-wrapper">
                {reviewsWithText.map(review => (
                    <ReviewCard key={review.id} {...review} />
                ))}
            </div>
        </div>
    );
};

type ComposeReviewButtonProps = {
    redirectUrl: string,
    userReview: boolean,
};

const EmptyState = ({ redirectUrl }: { redirectUrl: string }) => (
    <div className="empty-state">
        <i className="fas fa-compact-disc empty-state-icon" />
        <h2 className="mb-4">
            <FormattedMessage id="no-review" />
        </h2>
        <ComposeReviewButton redirectUrl={redirectUrl} userReview={false} />
    </div>
);

const ComposeReviewButton = ({
    redirectUrl,
    userReview,
}: ComposeReviewButtonProps) => (
    <a href={redirectUrl} className="compose-review-button">
        <FormattedMessage id={userReview ? 'edit-review' : 'compose-review'} />
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

    const [imageAvailable, setImageAvailable] = useState(author.avatarUrl);

    return (
        <div className="review-card">
            <div className="review-card-header">
                <div className="review-user-info">
                    {imageAvailable ? (
                        <img
                            onError={() => setImageAvailable(false)}
                            className="review-user-photo"
                            src={author.avatarUrl}
                            alt={`${author.displayName}`}
                        />
                    ) : (
                        <i className="fas fa-user-circle ml-0 mr-3" />
                    )}
                    <span className="review-user-name">
                        <FormattedMessage
                            id="user-review"
                            values={{
                                author: (
                                    <span className="bold-text">
                                        {author.displayName ?? 'User'}
                                    </span>
                                ),
                            }}
                        />
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
