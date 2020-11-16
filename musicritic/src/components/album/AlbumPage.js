/* @flow */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { getAlbum, getArtistAlbums } from '../../api/SpotifyWebAPI';

import AlbumSummary from './summary/AlbumSummary';
import ReviewSection from '../review/ReviewSection';
import { usePromise } from '../../utils/hooks';

import './AlbumPage.css';
import { getCurrentUserAlbumReview, getAlbumReviews } from '../../api/AlbumAPI';
import Loading from '../common/loading/Loading';

function AlbumPage() {
    const { id } = useParams();
    const [album] = usePromise(getAlbum(id), {}, [id]);
    const [mainArtist, setMainArtist] = useState({});
    const [userRating, setUserRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [artistAlbums] = usePromise(
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
    );

    useEffect(() => {
        function setAlbumMainArtist() {
            if (album.artists) setMainArtist(album.artists[0]);
        }

        async function getAlbumFromAPI() {
            const { rating: ratingResponse } = await getCurrentUserAlbumReview(
                id
            );
            const reviewsResponse = await getAlbumReviews(id);
            setUserRating(ratingResponse);
            setReviews(reviewsResponse);
            setLoading(false);
        }

        getAlbumFromAPI();
        setAlbumMainArtist();
    }, [album, id]);

    return !loading ? (
        <div className="row album-page border container shadow-sm">
            <section className="album-page-section col-lg-4">
                <AlbumSummary
                    album={album}
                    artistAlbums={artistAlbums}
                    mainArtist={mainArtist}
                    userRating={userRating}
                />
            </section>
            <section className="album-page-section col-lg-8">
                <ReviewSection redirectUrl={`/album/${id}/review`} reviews={reviews} />
            </section>
        </div>
    ): (
        <Loading />
    );
}

export default AlbumPage;
