import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
import RatingModal from '../common/rating/RatingModal';
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
    const [isOpen, setIsOpen] = useState(false);
    const [chosenRating, setChosenRating] = useState(0);
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
    }, [id, user]);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const showConfirmationModal = (newRating: number) => {
        toggle();
        setChosenRating(newRating);
    }

    const postRating = () => {
        if (chosenRating !== userRating) postAlbumReview(id, chosenRating);
        toggle();
    };

    const cancelRating = () => {
        if (chosenRating !== userRating) setChosenRating(userRating);
        toggle();
    }


    return !loading ? (

        <div className="row m-0">
            <section className="col-lg-4 p-0">
            <RatingModal show={isOpen} cancel={cancelRating} rating={chosenRating} ratingContent={album.name} confirm={postRating}/>

                <AlbumSummary
                    album={album}
                    artistAlbums={artistAlbums}
                    mainArtist={mainArtist}
                    userRating={userRating}
                    averageRating={averageRating}
                    postRating={showConfirmationModal}
                />
            </section>
            <section className="col-lg-8">
                <ReviewSection redirectUrl={`/album/${id}/review`} reviews={reviews} />
            </section>
        </div>
    ): (
        <Loading />
    );
}

export default AlbumPage;
