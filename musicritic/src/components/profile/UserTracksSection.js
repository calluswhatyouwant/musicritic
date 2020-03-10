/* @flow */

import React from 'react';
import { Track, PlayHistory } from 'spotify-web-sdk';

import TrackCarousel from './TopTracksCarousel';
import RecentTracksCarousel from './RecentTracksCarousel';

import './UserTracksSection.css';

type Props = {
    display: string,
    history: any,
    onClick: (display: string) => void,
    tracks: Track[] | PlayHistory[],
};

const UserTracksSection = ({
    display, history, onClick, tracks,
}: Props) => (
    <div className="user-page-section__container border container shadow-sm">
        <section className="user-page-section">
            <TracksSectionTop currentTab={display} onClick={onClick} />
            {display === 'TOP' &&
                <TrackCarousel history={history} tracks={tracks} />}
            {display === 'RECENT' &&
                <RecentTracksCarousel history={history} tracks={tracks} />}
        </section>
    </div>
);

type TracksSectionTopProps = {
    currentTab: string,
    onClick: (display: string) => void,
};

const TracksSectionTop = ({ currentTab, onClick }: TracksSectionTopProps) => (
    <div className="row">
        <div className="col-auto mr-auto">
            <h2 className="user-page-section__title">
                Your {currentTab === 'TOP' ? 'top' : 'recent'} tracks
            </h2>
        </div>
        <div className="col-auto tracks-section-switch">
            <button
              className="btn tracks-section-switch__button"
              onClick={onClick}
            >
                <i className="fas fa-exchange-alt" />
            </button>
        </div>
    </div>
);

export default UserTracksSection;
