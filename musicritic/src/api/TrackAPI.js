/* @flow */

import axios from 'axios';

type ReviewInfoModel = {
    createdAt: Date | null,
    updatedAt: Date | null,
    content: string,
};

export const trackApi = axios.create({
    baseURL: process.env.SERVER_BASE_URL,
    headers: {
        Authorization: localStorage.getItem('authToken'),
    },
});

export const postTrackReview = (
    trackID: string,
    rating: number,
    review?: ReviewInfoModel
) =>
    trackApi
        .post(
            `tracks/${trackID}/reviews`,
            review ? { rating, review } : { rating }
        )
        .then(result => result.data)
        .catch(error => {
            throw error.response.data;
        });

export const updateTrackReview = (
    trackID: string,
    reviewId: string,
    rating: number,
    review?: ReviewInfoModel
) =>
    trackApi
        .put(
            `tracks/${trackID}/reviews/${reviewId}`,
            review ? { rating, review } : { rating }
        )
        .then(result => result.data)
        .catch(error => {
            throw error.response.data;
        });

export const getCurrentUserTrackReview = (trackID: string) =>
    trackApi
        .get(`tracks/${trackID}/reviews/me`)
        .then(result => result.data)
        .catch(error => {
            throw error.response.data;
        });

export const getTrackReviews = (trackID: string) =>
    trackApi
        .get(`tracks/${trackID}/reviews`)
        .then(result => result.data)
        .catch(error => {
            throw error.response.data;
        });

export const getTrackAverageRating = (trackID: string) =>
    trackApi
        .get(`tracks/${trackID}`)
        .then(result => result.data.averageRating)
        .catch(error => {
            throw error.response.data;
        });
