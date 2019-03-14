/* @flow */

import React, { Component } from 'react';
import { Track, PlayHistory } from 'spotify-web-sdk';
import moment from 'moment';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import TrackCard from '../common/track/TrackCard';

import './TrackCarousel.css';

type Props = {
    tracks: PlayHistory[],
    history: any,
};

class RecentTracksCarousel extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (track: Track) => {
        this.props.history.push(`/track/${track.id}`);
    };

    render() {
        const { tracks } = this.props;

        const slide = (key: number, playHistory: PlayHistory) => (
            <div key={key}>
                <TrackCard
                  track={playHistory.track}
                  relativeTime={moment(playHistory.playedAt).fromNow()}
                  handleClick={() => this.handleClick(playHistory.track)}
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

export default RecentTracksCarousel;
