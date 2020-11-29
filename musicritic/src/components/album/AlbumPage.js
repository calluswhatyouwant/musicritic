/* @flow */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { getArtistAlbums } from '../../api/SpotifyWebAPI';

import AlbumSummary from './summary/AlbumSummary';
import ReviewSection from '../review/ReviewSection';
import { usePromise } from '../../utils/hooks';

import './AlbumPage.css';
import { 
    getCurrentUserAlbumReview,
    getAlbumReviews,
    getAlbumAverageRating,
    postAlbumReview,
    getAlbum as getAlbumAPI
} from '../../api/AlbumAPI';
import Loading from '../common/loading/Loading';
import { useSession } from '../app/App';


function AlbumPage() {
    const user = useSession();
    const { id } = useParams();
    const [album] = usePromise(getAlbumAPI(id), {}, [id]);
    const [mainArtist, setMainArtist] = useState({});
    const [userRating, setUserRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [artistAlbums] = user ?
        usePromise(
            (async () => {
                if (mainArtist.id) {
                    const artistAlbumsResponse = await getArtistAlbums(
                        mainArtist.id,
                        ['album']
                    );
                    return _.uniqBy(artistAlbumsResponse.items, 'name');
                }
                return [];
            })(),
            [],
            [mainArtist]
        )
        :
        useState(undefined);

    useEffect(() => {
        function setAlbumMainArtist() {
            if (album.artists) setMainArtist(album.artists[0]);
        }

        async function getAlbumFromAPI() {
            if (user) {
                const { rating: ratingResponse } = await getCurrentUserAlbumReview(
                    id
                );
                setUserRating(ratingResponse);
            } else {
                setUserRating(undefined);
            }
            const reviewsResponse = await getAlbumReviews(id);
            const avgRatingResponse = await getAlbumAverageRating(id);
            setReviews(reviewsResponse);
            setAverageRating(avgRatingResponse);
            setLoading(false);
        }
        setAlbumMainArtist();
        getAlbumFromAPI();
    }, [album, id]);

    const postRating = (newRating: number) => {
        if (newRating !== userRating) postAlbumReview(id, newRating);
    };

    return !loading ? (
        <div className="row album-page border container shadow-sm">
            <section className="album-page-section col-lg-4">
                <AlbumSummary
                    album={album}
                    artistAlbums={artistAlbums}
                    mainArtist={mainArtist}
                    userRating={userRating}
                    averageRating={averageRating}
                    postRating={postRating}
                />
            </section>
            <section className="album-page-section col-lg-8">
                <ReviewSection redirectUrl={user ? `/album/${id}/review` : `/home`} reviews={reviews} />
            </section>
        </div>
    ): (
        <Loading />
    );
}

export default AlbumPage;
