import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Album } from 'spotify-web-sdk';

import SocialButton from '../common/social-button/SocialButton';
import Loading from '../common/loading/Loading';
import AlbumCard from '../common/album/AlbumCard';

import { getRecentReviews, getSeveralAlbums } from '../../api/AlbumAPI';
import { usePromise } from '../../utils/hooks';

const HomePage = () => {
    const [reviews, , loadingReviews] = usePromise(getRecentReviews(), [], []);
    const [albums, , loadingAlbums] = usePromise(
        getSeveralAlbums(reviews.map(review => review.contentId)),
        [],
        [reviews]
    );

    if (loadingReviews || loadingAlbums || albums.length === 0) {
        return <Loading />;
    }

    const albumsWithReviews = reviews.map((review, index) => ({
        album: albums[index],
        review,
    }));

    return (
        <div className="home-container">
            <SpotifyConnect />
            <h1 className="mb-3">
                <FormattedMessage id="recently-reviewed-albums" />
            </h1>
            <ReviewSection albumsWithReviews={albumsWithReviews} />
        </div>
    );
};

const ReviewSection = ({ albumsWithReviews }: { albumsWithReviews: any[] }) => (
    <div className="row">
        {albumsWithReviews.map(albumWithReview => (
            <ReviewCardWithHeader {...albumWithReview} />
        ))}
    </div>
);

const ReviewCardWithHeader = ({
    album,
    review: { rating, author },
}: {
    album: Album,
    review: any,
}) => {
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
                    <FormattedMessage
                        id="review-rating-user-name"
                        values={{
                            rating,
                            icon: <i className="fas fa-star" />,
                            authorName: (
                                <span className="bold-text">
                                    {author.displayName}
                                </span>
                            ),
                        }}
                    />
                </span>
            </div>
            <AlbumCard
                album={album}
                handleClick={() => history.push(`/album/${album.id}`)}
            />
        </div>
    ) : null;
};

const SpotifyConnect = () => {
    const serverBaseUri = process.env.SERVER_BASE_URL || '';

    return (
        <div className="row align-items-center border border-dark rounded bg-dark text-light p-4 mb-3">
            <h1 className="col-12 col-lg-8">
                <FormattedMessage id="login-cta" />
            </h1>
            <div className="col-12 col-lg-4">
                <SocialButton
                    content={<FormattedMessage id="spotify-login" />}
                    name="spotify"
                    url={`${serverBaseUri}/auth/login`}
                />
            </div>
        </div>
    );
};

export default HomePage;
