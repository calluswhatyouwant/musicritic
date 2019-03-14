/* @flow */

import React, { Component } from 'react';
import { Track } from 'spotify-web-sdk';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import TrackCard from '../common/track/TrackCard';

import './TrackCarousel.css';

type Props = {
    tracks: Track[],
    history: any,
};

class TrackCarousel extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (track: Track) => {
        this.props.history.push(`/track/${track.id}`);
    };

    render() {
        const { tracks } = this.props;

        const slide = (key, track) => (
            <div key={key}>
                <TrackCard
                  track={track}
                  handleClick={() => this.handleClick(track)}
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
        };

        return (
            <Slider {...sliderSettings}>
                {slides}
            </Slider>
        );
    }
}

export default TrackCarousel;
