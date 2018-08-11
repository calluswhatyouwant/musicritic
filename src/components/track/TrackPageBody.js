/* @flow */

import React from 'react';

import AudioFeatures from '../../models/AudioFeatures';
import Rating from '../common/rating/Rating';

type Props = {
    audioFeatures: AudioFeatures,
    userRating: number,
    averageRating: number,
};

const TrackPageBody = ({ audioFeatures, userRating, averageRating }: Props) => (
    <div className="container">
        <AudioFeatureTagList audioFeatures={audioFeatures} />
        <TrackRating userRating={userRating} averageRating={averageRating} />
    </div>
);

type AudioFeatureTagListProps = {
    audioFeatures: AudioFeatures,
};

const AudioFeatureTagList = ({ audioFeatures }: AudioFeatureTagListProps) => {
    const { tags } = audioFeatures;
    const tagColumns = tags.map((tag) => {
        if (!tag.value) return <div />;
        return <AudioFeatureTag feature={tag.feature} value={tag.value} />;
    });

    return (
        <div className="border padding">
            <div className="row justify-content-md-center text-center">
                {tagColumns}
            </div>
        </div>
    );
};

type AudioFeatureTagProps = {
    feature: string,
    value: string,
};

const AudioFeatureTag = ({ feature, value }: AudioFeatureTagProps) => (
    <div className="col-md-auto">
        <div className="btn-group" role="group">
            <button className="btn btn-dark btn-sm">
                {feature}
            </button>
            <button className="btn btn-secondary btn-sm">
                {value}
            </button>
        </div>
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
