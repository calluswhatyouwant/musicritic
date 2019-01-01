/* @flow */

import React from 'react';

import Rating from '../common/rating/Rating';

type Props = {
    userRating: number,
    averageRating: number,
};

const TrackPageBody = ({ userRating, averageRating }: Props) => (
    <div className="container">
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
        <TrackRatingColumn rating={averageRating} title="AVERAGE RATING" />
    </div>
);

type TrackRatingColumnProps = {
    rating: number,
    title: string,
};

const TrackRatingColumn = ({ rating, title }: TrackRatingColumnProps) => (
    <div className="col-md-auto border padding">
        <h5 className="rating-title">{title}</h5>
        <h5>
            <Rating value={rating} />
        </h5>
    </div>
);

export default TrackPageBody;
