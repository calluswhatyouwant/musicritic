/* @flow */

import React, { useState, useEffect } from 'react';

import './Rating.css';

type Props = {
    initialValue: number,
    onValueChange?: () => void,
    displayOnly?: boolean,
    postRating?: Function,
}

const Rating = ({ initialValue, onValueChange, displayOnly }: Props) => {
    const [value, setValue] = useState(initialValue);
    const [hoverValue, setHoverValue] = useState(0);

    const postValue = (args) => {
        postRating(args)
        setValue(args)
    }
    
    const [displayValue, setDisplayValue] = useState(initialValue);
    useEffect(() => {
        if (hoverValue) {
            setDisplayValue(hoverValue);
        } else {
            setDisplayValue(value);
        }
    }, [value, hoverValue]);

    useEffect(() => {
        if (onValueChange) onValueChange(value);
    }, [value]);
    
    const stars = [];

    for (let index = 0; index < 5; index += 1) {
        stars.push(
            <RatingStar
                key={index}
                index={index}
                displayValue={displayValue}
                setValue={postValue}
                setHoverValue={setHoverValue}
                displayOnly={displayOnly}
            />
        );
    }

    return <div className="rating" onMouseLeave={() => setHoverValue(0)}>{stars}</div>;
};

Rating.defaultProps = {
    onValueChange: () => {},
    displayOnly: false,
    postRating: () => {},
}

type StarProps = {
    index: number,
    displayValue: number,
    setValue: (value: number) => void,
    setHoverValue: (value: number) => void,
    displayOnly?: boolean,
}

const RatingStar = ({ index, displayValue, setValue, setHoverValue, displayOnly }: StarProps) => {
    let iconClassName;
    if (displayValue >= index + 1) { 
        iconClassName = 'fas fa-star';
    } else if (displayValue === index + 0.5) {
        iconClassName = 'fas fa-star-half-alt';
    } else {
        iconClassName = 'far fa-star';
    }

    const starHalfProps = (modifier: number) => ({
        onClick: () => setValue(index + modifier),
        onMouseOver: () => setHoverValue(index + modifier),
        className: 'rating-star-half',
        tabIndex: 0,
        role: 'button',
    });

    return (
        <div className="rating-star" key={index}>
            <div className="rating-star-container">
                <span {...displayOnly ? {} : starHalfProps(0.5)} />
                <span {...displayOnly ? {} : starHalfProps(1)}  />
            </div>
            <i className={iconClassName} />
        </div>
    );
}

RatingStar.defaultProps = {
    displayOnly: false,
}

export default Rating;
