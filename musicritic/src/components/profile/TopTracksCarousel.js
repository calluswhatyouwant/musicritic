/* @flow */

import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import TrackCard from '../common/track/TrackCard';

import './TrackCarousel.css';

const TrackCarousel = ({ tracks }) => {
    const handleClick = track => {
        this.props.history.push(`/track/${track.id}`);
    };

    const slide = (key, track) => (
        <div key={key}>
            <TrackCard
                track={track}
                handleClick={() => handleClick(track)}
                rank={key + 1}
            />
        </div>
    );

    const slides = tracks.map((track, index) => slide(index, track));
    const sliderSettings = {
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: false,
        lazyLoad: true,
        speed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return <Slider {...sliderSettings}>{slides}</Slider>;
};

export default TrackCarousel;
