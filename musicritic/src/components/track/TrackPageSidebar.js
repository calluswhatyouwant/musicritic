import React from 'react';
import { Track } from 'spotify-web-sdk';

import Rating from '../common/rating/Rating';

type Props = {
    userRating: number,
    averageRating: number,
    postRating: (rating: number) => void,
    track: Track,
    prevTrack: Track | {},
    nextTrack: Track | {},
};

const TrackPageSidebar = ({
    userRating,
    averageRating,
    postRating,
    track,
    prevTrack,
    nextTrack,
}: Props) => (
        <div>
            <div
                className="album-summary text-light"
                style={{ backgroundImage: `url(${track.album.images[0].url})` }}>
                <div className="track-page-header__data">
                    <img
                        alt="Album"
                        className="track-page-header__cover shadow-lg"
                        src={track.album.images[0].url}
                    />
                    <TrackInfo track={track} />
                </div>
                <TrackRatings
                    averageRating={averageRating}
                    userRating={userRating}
                    postRating={postRating}
                />
                <div className="album-menu">
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={track.externalUrls ? track.externalUrls.spotify : ''}
                        className="btn album-menu__button album-menu__button--play text-light">
                        Open on Spotify
                    </a>
                </div>
            </div>
            {(prevTrack.name || nextTrack.name) && (
                <TrackAlbumNavigation
                    track={track}
                    prevTrack={prevTrack}
                    nextTrack={nextTrack}
                />
            )}
        </div>
    );

type TrackInfoProps = {
    track: Track,
};

const TrackInfo = ({ track }: TrackInfoProps) => (
    <div className="text-center track-info">
        <h1>{track.name}</h1>
        <h4>by <a className="text-light" href={`/artist/${track.artists[0].id}`}>
            {track.stringArtists}
        </a>
        </h4>
        <h5>
            from the album{' '}
            <a className="text-light" href={`/album/${track.album.id}`}>
                {track.album.name}
            </a>
        </h5>
        <p>
            {track.releaseYear} &bull; {track.length}
        </p>
    </div>
);

type TrackAlbumNavigationProps = {
    track: Track,
    prevTrack: Track | {},
    nextTrack: Track | {},
};

const TrackAlbumNavigation = ({ track, prevTrack, nextTrack }: TrackAlbumNavigationProps) => (
    <div className="track-album-navigation text-center text-light">
        <h5 className="mb-3">
            More from{' '}
            <a className="text-light" href={`/album/${track.album.id}/`}>
                {track.albumName}
            </a>
                :
            </h5>
        <div className="track-album-navigation-container row">
            {prevTrack.name && (
                <a
                    href={`/track/${prevTrack.id}`}
                    className="track-album-navigation-button col-4">
                    <p className="album-rating__title">{'<'} Previous</p>
                    <p className="mb-0">{prevTrack.name}</p>
                </a>
            )}
            {nextTrack.name && (
                <a
                    href={`/track/${nextTrack.id}`}
                    className="track-album-navigation-button col-4">
                    <p className="album-rating__title">Next {'>'}</p>
                    <p className="mb-0">{nextTrack.name}</p>
                </a>
            )}
        </div>
    </div>
);

type TrackRatingsProps = {
    postRating: (rating: number) => void,
    averageRating: number,
    userRating: number,
};

const TrackRatings = ({
    averageRating,
    userRating,
    postRating,
}: TrackRatingsProps) => (
        <div className="album-ratings row">
            <TrackRating
                rating={averageRating}
                title="Average rating"
                displayOnly
            />
            {(userRating !== undefined) && (
                <TrackRating
                    rating={userRating}
                    title="Your rating"
                    postRating={postRating}
                />
            )}
        </div>
    );

type TrackRatingProps = {
    rating: number,
    title: string,
    displayOnly?: boolean,
    postRating?: Function,
};

const TrackRating = ({
    rating,
    title,
    displayOnly,
    postRating,
}: TrackRatingProps) => (
        <div className="album-rating col-4">
            <p className="album-rating__title">{title}</p>
            {(!displayOnly || rating > 0) && (
                <Rating
                    initialValue={rating}
                    displayOnly={displayOnly}
                    onValueChange={postRating}
                />
            )}
            {(displayOnly && rating === 0) && (<i>Not rated yet.</i>)}
        </div>
    );

TrackRating.defaultProps = {
    displayOnly: false,
    postRating: () => { },
};

export default TrackPageSidebar;
