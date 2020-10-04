/* @flow */

import React from 'react';

import Rating from '../common/rating/Rating';

type Props = {
    userRating: number,
    averageRating: number,
};

const TrackPageBody = ({ userRating, averageRating }: Props) => (
    <div className="track-page-body container">
        <TrackRating userRating={userRating} averageRating={averageRating} />
    </div>
);

type TrackRatingProps = {
    userRating: number,
    averageRating: number,
};

const TrackRating = ({ userRating, averageRating }: TrackRatingProps) => (
    <div className="padding row justify-content-md-center text-center">
        <TrackRatingColumn rating={userRating} title="YOUR RATING" />
        <TrackRatingColumn rating={averageRating} title="AVERAGE RATING" displayOnly />
    </div>
);

type TrackRatingColumnProps = {
    rating: number,
    title: string,
    displayOnly?: boolean,
};

const TrackRatingColumn = ({ rating, title, displayOnly }: TrackRatingColumnProps) => (
    <div className="track-rating-col col-md-auto border padding">
        <h5>{title}</h5>
        <h5 className="text-center">
            <Rating initialValue={rating} displayOnly={displayOnly} />
        </h5>
    </div>
);

TrackRatingColumn.defaultProps = {
    displayOnly: false,
}

export default TrackPageBody;
