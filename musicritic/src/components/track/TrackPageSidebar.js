import React from 'react';
import { Track } from 'spotify-web-sdk';
import { useHistory } from 'react-router-dom';

import Rating from '../common/rating/Rating';
import { postTrackRating } from '../../api/UserAPI';

type Props = {
    track: Track,
    prevTrack: Track | {},
    nextTrack: Track | {},
};

const TrackPageSidebar = ({ track, prevTrack, nextTrack }: Props) => (
    <div>
        <div
          className="album-summary text-light"
          style={{ backgroundImage: `url(${track.album.imageUrl})` }}
        >
            <div className="track-page-header__data">
                <img
                    alt="Album"
                    className="track-page-header__cover shadow-lg"
                    src={track.album.imageUrl}
                />
                <TrackInfo track={track} />
            </div>
            <TrackRatings averageRating={3.5} userRating={4} trackId={track.id} />
            <div className="album-menu">
                <button
                  type="button"
                  className="btn album-menu__button album-menu__button--play text-light"
                >
                    Open on Spotify
                </button>
            </div>
        </div>
        {(prevTrack.name || nextTrack.name) && (
            <TrackAlbumNavigation track={track} prevTrack={prevTrack} nextTrack={nextTrack} />
        )}
    </div>
);

type TrackInfoProps = {
    track: Track,
}

const TrackInfo = ({ track }: TrackInfoProps) => (
    <div className="text-center track-info">
        <h1>{track.name}</h1>
        <h4>by {track.stringArtists}</h4>
        <h5>from the album <a className="text-light" href={`/album/${track.album.id}/`}>{track.albumName}</a></h5>
        <p>
            {track.releaseYear} &bull; {track.length}
        </p>
    </div>
);

const TrackAlbumNavigation = ({ track, prevTrack, nextTrack }: Props) => {
    const history = useHistory();
    const clickableProps = (trackId) => ({
        onClick: () => history.push(`/track/${trackId}/`),
        tabIndex: 0,
        onKeyPress: () => {},
        role: 'button',
    });
    
    return (
        <div className="track-album-navigation text-center text-light">
            <h5 className="mb-3">
                More from <a className="text-light" href={`/album/${track.album.id}/`}>{track.albumName}</a>:
            </h5>
            <div className="track-album-navigation-container row">
                {prevTrack.name && (
                    <div {...clickableProps(prevTrack.id)} className="track-album-navigation-button col-4">
                        <p className="album-rating__title">{'<'} Previous</p>
                        <p className="mb-0">{prevTrack.name}</p>
                    </div>
                )}
                {nextTrack.name && (
                    <div {...clickableProps(nextTrack.id)} className="track-album-navigation-button col-4">
                        <p className="album-rating__title">Next {'>'}</p>
                        <p className="mb-0">{nextTrack.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

type TrackRatingsProps = {
    averageRating: number,
    userRating: number,
    trackId: string,
};

const TrackRatings =({ averageRating, userRating, trackId }: TrackRatingsProps) => {
    const postRating = (rating) => {
        postTrackRating(trackId, rating)
    }

    return (
        <div className="album-ratings row">
            <TrackRating
                rating={averageRating}
                title="Average rating"
                displayOnly
            />
            <TrackRating 
                rating={userRating}
                title="Your rating" 
                postRating={postRating}
            />
        </div>
    )
};

type TrackRatingProps = {
    rating: number,
    title: string,
    displayOnly?: boolean,
    postRating?: Function
};

const TrackRating = ({ 
    rating,
    title,
    displayOnly,
    postRating
}: TrackRatingProps) => (
    <div className="album-rating col-4">
        <p className="album-rating__title">{title}</p>
        <Rating
            initialValue={rating}
            displayOnly={displayOnly}
            postRating={postRating}
        />
    </div>
);

TrackRating.defaultProps = {
    displayOnly: false,
};

export default TrackPageSidebar;
