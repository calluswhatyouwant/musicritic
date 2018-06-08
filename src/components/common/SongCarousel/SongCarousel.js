/* @flow */

import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import TrackCard from '../track/TrackCard';
import { Track } from '../../../spotify/models';
import './carousel.css';

const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: false,
    lazyLoad: true,
};

type Props = {
    tracks: Array<Track>,
};

const SongCarousel = ({ tracks }: Props) => {
    const slide = (key, track) => (
        <div key={key}><TrackCard track={track} /></div>
    );
    const slides = tracks.map((track, index) => slide(index, track));
    return (
        <Slider {...sliderSettings}>
            {slides}
        </Slider>
    );
};

export default SongCarousel;
