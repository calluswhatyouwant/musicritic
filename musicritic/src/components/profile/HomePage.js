import React from 'react';
import { useHistory } from 'react-router-dom';
import { Album } from 'spotify-web-sdk';

import SocialButton from '../common/social-button/SocialButton';
import Loading from '../common/loading/Loading';
import AlbumCard from '../common/album/AlbumCard';

import { getRecentReviews, getSeveralAlbums } from '../../api/AlbumAPI';
import { usePromise } from '../../utils/hooks';

const HomePage = () => {
    const [reviews, , loadingReviews] = usePromise(getRecentReviews(), [], []);
    const [albums, , loadingAlbums] = usePromise(getSeveralAlbums(reviews.map(review => review.contentId)), [], [reviews]);

    if (loadingReviews || loadingAlbums || albums.length === 0) {
        return <Loading />;
    }

    const albumsWithReviews = reviews.map((review, index) => ({ album: albums[index], review }));
    
    return (
        <div className="px-6">
            <SpotifyConnect />
            <h1 className="mb-3">Recently reviewed albums</h1>
            <ReviewSection albumsWithReviews={albumsWithReviews} />
        </div>
    );
};

const ReviewSection = ({ albumsWithReviews }: { albumsWithReviews: any[] }) => (
    <div className="row">
        {albumsWithReviews
            .map(albumWithReview => <ReviewCardWithHeader {...albumWithReview} />)}
    </div>
);

const ReviewCardWithHeader = ({ album, review: { rating, author } }: { album: Album, review: any }) => {
    const history = useHistory();
    return album ? (
        <div className="col-lg-3 col-md-4 pb-3">
            <div className="review-user-info bg-light p-2">
                <img
                    className="review-user-photo round-cropped"
                    src={author.avatarUrl}
                    alt={`${author.displayName}`}
                />
                <span className="review-user-name">
                    Rated {rating} <i className="fas fa-star" /> by <span className="bold-text">{author.displayName}</span>
                </span>
            </div>
            <AlbumCard album={album} handleClick={() => history.push(`/album/${album.id}`)} />
        </div>
    ) : null;
}

const SpotifyConnect = () => {
    const serverBaseUri = process.env.SERVER_BASE_URL || '';

    return (
        <div className="d-flex align-items-center border border-dark rounded bg-dark text-light justify-content-between p-4 mb-3">
            <h1>Login for the complete experience!</h1>
            <div className="w-25">
                <SocialButton
                    name="spotify"
                    url={`${serverBaseUri}/auth/login`}
                />
                Login with Spotify
            </div>
        </div>
    );
};

export default HomePage;
