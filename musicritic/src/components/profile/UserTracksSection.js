/* @flow */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    getRecentlyPlayedTracks,
    getTopPlayedTracks,
} from '../../api/SpotifyWebAPI';

import TrackCarousel from './TopTracksCarousel';
import RecentTracksCarousel from './RecentTracksCarousel';

import './UserTracksSection.css';
import Loading from '../common/loading/Loading';
import { usePromise } from '../../utils/hooks';

const UserTracksSection = () => {
    const [display, setDisplay] = useState('TOP');
    const [recentTracks, , loadingRecent] = usePromise(getRecentlyPlayedTracks(), [], []);
    const [topTracks, , loadingTop] = usePromise(getTopPlayedTracks(), [], []);
    const history = useHistory();

    const handleClick = () => {
        setDisplay(display === 'TOP' ? 'RECENT' : 'TOP');
    };

    return loadingRecent || loadingTop ? (
        <Loading />
    ) : (
            <div className="user-page-section__container border container shadow-sm">
                <section className="user-page-section">
                    <TracksSectionTop currentTab={display} onClick={handleClick} />
                    {display === 'TOP' &&
                        <TrackCarousel history={history} tracks={topTracks} />}
                    {display === 'RECENT' &&
                        <RecentTracksCarousel history={history} tracks={recentTracks} />}
                </section>
            </div>
        );
};

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
