import React from 'react';
import PropTypes, {instanceOf} from 'prop-types';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {Track} from '../../spotify/models';
import './style.css';

const sliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    adaptiveHeight: false,
    lazyLoad: true
};

const SongCarousel = ({tracks, onSelectTrack}) => {
    const slide = (key, track) => <div key={key}><SongCarouselItem track={track}/></div>
    const slides = tracks.map((track, index) => slide(index, track));
    return (
        <Slider {...sliderSettings}>
            {slides}
        </Slider>
    );
}

const SongCarouselItem = ({track}) => (
    <div className="card text-center">
        <img className="card-img-top" src={track.album.imageUrl} />
        <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">{track.name}</h6>
            <p className="card-text">{track.stringArtists}</p>
        </div>
    </div>
);

SongCarousel.propTypes = {
    tracks: PropTypes.arrayOf(instanceOf(Track)).isRequired,
    onSelectTrack: PropTypes.func
};

SongCarouselItem.propTypes = {
    track: PropTypes.object.isRequired
};

export default SongCarousel;
