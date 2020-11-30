import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import AlbumSummary from './summary/AlbumSummary';
import ReviewSection from '../review/ReviewSection';

import './AlbumPage.css';
import { 
    getCurrentUserAlbumReview,
    getAlbumReviews,
    getAlbumAverageRating,
    postAlbumReview,
    getAlbum as getAlbumAPI
} from '../../api/AlbumAPI';
import { getArtistAlbums as getArtistAlbumsAPI } from '../../api/ArtistAPI' 
import Loading from '../common/loading/Loading';
import { useSession } from '../app/App';


function AlbumPage() {
    const user = useSession();
    const { id } = useParams();
    const [album, setAlbum] = useState({});
    const [mainArtist, setMainArtist] = useState({});
    const [userRating, setUserRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [artistAlbums, setArtistAlbums] = useState({});

    useEffect(() => {
        async function getAlbumFromAPI() {
            const userLoggedIn = user && user !== 'unknown';
            const albumResponse = await getAlbumAPI(id);
            const mainArtistResponse = albumResponse.artists[0];
            if (userLoggedIn) {
                const { rating: ratingResponse } = await getCurrentUserAlbumReview(
                    id
                );
                setUserRating(ratingResponse || 0);
            } else {
                setUserRating(undefined);
            }
            const reviewsResponse = await getAlbumReviews(id);
            const avgRatingResponse = await getAlbumAverageRating(id);
            const artistAlbumsResponse = await getArtistAlbumsAPI(mainArtistResponse.id);
            setAlbum(albumResponse);
            setMainArtist(mainArtistResponse);
            setArtistAlbums(artistAlbumsResponse);
            setReviews(reviewsResponse);
            setAverageRating(avgRatingResponse);
            setLoading(false);
        }
        getAlbumFromAPI();
    }, [album, id, user]);

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
                <ReviewSection redirectUrl={`/album/${id}/review`} reviews={reviews} />
            </section>
        </div>
    ): (
        <Loading />
    );
}

export default AlbumPage;
