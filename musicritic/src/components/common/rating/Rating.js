/* @flow */

import React, { useState } from 'react';

const Rating = props => {
    const [value, setValue] = useState(props.value);

    const handleClick = newValue => {
        setValue(newValue);
    };

    const stars = [];

    for (let i = 0; i < 5; i += 1) {
        if (value >= i + 1) {
            stars.push(<SolidStar handleClick={() => handleClick(i + 1)} />);
        } else if (value >= i + 0.5) {
            stars.push(<StarHalf handleClick={() => handleClick(i + 1)} />);
        } else {
            stars.push(<RegularStar handleClick={() => handleClick(i + 1)} />);
        }
    }

    return <div>{stars}</div>;
};

const clickableProps = handleClick => ({
    onClick: handleClick,
    tabIndex: 0,
    onKeyPress: () => {},
    role: 'button',
});

const SolidStar = ({ handleClick }) => (
    <i className="fas fa-star" {...clickableProps(handleClick)} />
);

const RegularStar = ({ handleClick }) => (
    <i className="far fa-star" {...clickableProps(handleClick)} />
);

const StarHalf = ({ handleClick }) => (
    <i className="fas fa-star-half-alt" {...clickableProps(handleClick)} />
);

export default Rating;
