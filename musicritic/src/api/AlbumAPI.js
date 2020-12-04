/* @flow */

import axios from 'axios';

type ReviewInfoModel = {
    createdAt: Date | null,
    updatedAt: Date | null,
    content: string,
};

export const albumAPI = axios.create({
    baseURL: process.env.SERVER_BASE_URL,
    headers: {
        Authorization: localStorage.getItem('authToken'),
    },
});

export const postAlbumReview = (
    albumID: string,
    rating: number,
    review?: ReviewInfoModel
) =>
    albumAPI
        .post(
            `album/${albumID}/reviews`,
            review ? { rating, review } : { rating }
        )
        .then(result => result.data)
        .catch(error => {
            throw error.response.data;
        });

export const updateAlbumReview = (
    albumID: string,
    reviewId: string,
    rating: number,
    review?: ReviewInfoModel
) =>
    albumAPI
        .put(
            `album/${albumID}/reviews/${reviewId}`,
            review ? { rating, review } : { rating }
        )
        .then(result => result.data)
        .catch(error => {
            throw error.response.data;
        });

export const getCurrentUserAlbumReview = (albumID: string) =>
    albumAPI
        .get(`album/${albumID}/reviews/me`)
        .then(result => result.data)
        .catch(error => {
            throw error.response.data;
        });

export const getAlbumReviews = (albumID: string) =>
    albumAPI
        .get(`album/${albumID}/reviews`)
        .then(result => result.data)
        .catch(error => {
            throw error.response.data;
        });

export const getAlbumAverageRating = (albumID: string) =>
    albumAPI
        .get(`albums/${albumID}`)
        .then(result => result.data.averageRating)
        .catch(error => {
            throw error.response.data;
        });

export const getAlbum = (albumID: string) =>
    albumAPI
        .get(`albums/${albumID}`)
        .then(result => result.data.album)
        .catch(error => {
            throw error.response.data;
        });

export const getSeveralAlbums = (ids: string[]) =>
    albumAPI
        .get('albums', { params: { ids } })
        .then(result => result.data.albums.slice(0, 20))
        .catch(error => {
            throw error.response.data;
        });

export const getRecentReviews = () =>
    albumAPI.get('/album/reviews/recent')
        .then(result => result.data)
        .catch(error => {
            throw error.response.data;
        });
