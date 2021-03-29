import React, { useState } from 'react';
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
        <div>
            <SpotifyConnect />
            <div className="p-3 p-sm-5">
                <h1 className="mb-3">
                    <FormattedMessage id="recently-reviewed-albums" />
                </h1>
                <ReviewSection albumsWithReviews={albumsWithReviews} />
            </div>
        </div>
    );
};

const ReviewSection = ({ albumsWithReviews }: { albumsWithReviews: any[] }) => (
    <div className="card-columns mx-0">
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
    const [imageAvailable, setImageAvailable] = useState(author.avatarUrl);

    return album ? (
        <AlbumCard
            cardHeader={
                <div className="review-user-info bg-light p-2">
                    {imageAvailable ? (
                        <img
                            onError={() => setImageAvailable(false)}
                            className="review-user-photo"
                            src={author.avatarUrl}
                            alt={`${author.displayName}`}
                        />
                    ) : (
                        <i className="fas fa-user-circle text-dark ml-0 mr-3" />
                    )}
                    <span className="review-user-name">
                        <FormattedMessage
                            id="review-rating-user-name"
                            values={{
                                rating,
                                icon: <i className="fas fa-star" />,
                                authorName: (
                                    <span className="bold-text">
                                        {author.displayName ?? 'User'}
                                    </span>
                                ),
                            }}
                        />
                    </span>
                </div>
            }
            album={album}
            handleClick={() => history.push(`/album/${album.id}`)}
        />
    ) : null;
};

const SpotifyConnect = () => {
    const serverBaseUri = process.env.SERVER_BASE_URL || '';

    return (
        <div className="row align-items-center bg-dark text-light p-3 p-sm-5 mb-3 mx-0">
            <h1 className="col-12 col-lg-8 mb-3 mb-lg-0">
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
