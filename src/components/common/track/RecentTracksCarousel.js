/* @flow */

import React, { Component } from 'react';
import { Track, PlayHistory } from 'spotify-web-sdk';
import Slider from 'react-slick';

import RecentTrackCard from './RecentTrackCard';

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

        const slide = (key, playHistory) => (
            <div key={key}>
                <RecentTrackCard
                  playHistory={playHistory}
                  handleClick={() => this.handleClick(playHistory.track)}
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

export default RecentTracksCarousel;
