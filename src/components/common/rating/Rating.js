/* @flow */

import React from 'react';

type Props = {
    value: number;
};

const Rating = ({ value }: Props) => {
    const stars = [];

    for (let i = 0; i < 5; i += 1) {
        if (value >= i + 1) {
            stars.push(<SolidStar />);
        } else if (value >= i + 0.5) {
            stars.push(<StarHalf />);
        } else {
            stars.push(<RegularStar />);
        }
    }

    return <div>{ stars }</div>;
};

const SolidStar = () => (
    <i className="fas fa-star" />
);

const RegularStar = () => (
    <i className="far fa-star" />
);

const StarHalf = () => (
    <i className="fas fa-star-half-alt" />
);

export default Rating;
