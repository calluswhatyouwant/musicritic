/* @flow */

import React from 'react';
import moment from 'moment';
import { PlayHistory } from 'spotify-web-sdk';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import TrackCard from '../common/track/TrackCard';

import './TrackCarousel.css';

type Props = {
    tracks: PlayHistory[],
    history: any,
}

const RecentTracksCarousel = ({ tracks, history }: Props) => {
    const handleClick = track => {
        history.push(`/track/${track.id}`);
    };

    const slide = (key, playHistory) => (
        <div key={key}>
            <TrackCard
                track={playHistory.track}
                relativeTime={moment(playHistory.playedAt).fromNow()}
                handleClick={() => handleClick(playHistory.track)}
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

export default RecentTracksCarousel;
