/* @flow */

import React, { Component } from 'react';
import { Track } from 'spotify-web-sdk';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import TrackCard from '../track/TrackCard';

import './TrackCarousel.css';

type Props = {
    tracks: Array<Track>,
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
                />
            </div>
        );

        const slides = tracks.map((track, index) => slide(index, track));
        const sliderSettings = {
            slidesToShow: 4,
            slidesToScroll: 1,
            adaptiveHeight: false,
            lazyLoad: true,
        };

        return <Slider {...sliderSettings}>{slides}</Slider>;
    }
}

export default TrackCarousel;
