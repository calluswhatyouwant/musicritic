/* @flow */

import express from 'express';
import checkAuth from '../firebase/firebaseAuthHandler';
import {
    createReview,
    getUserReview,
    getReviews,
    updateUserReview,
} from './reviewCollections';

const router = express.Router();
export const ALBUM = 'album';

router.get('/album/:albumId/reviews', (req, res) => {
    const albumId = req.params.albumId;
    getReviews(albumId, ALBUM)
        .then(reviews => res.status(200).send(reviews))
        .catch(error => res.status(error.status).send(error));
});

router.get('/album/:albumId/reviews/me', checkAuth, (req, res) => {
    const albumId = req.params.albumId;
    const authorUid = req.user.uid;
    getUserReview(albumId, authorUid, ALBUM)
        .then(reviews => {
            reviews.size === 0
                ? res.status(204).send()
                : res.status(200).send(reviews.docs[0].data());
        })
        .catch(error => res.status(error.status).send(error));
});

router.post('/album/:albumId/reviews', checkAuth, (req, res) => {
    const review = req.body;
    review.contentId = req.params.albumId;
    review.authorUid = req.user.uid;
    review.contentType = ALBUM;
    if (!review.review || !review.review.createdAt) {
        review.review = {}
        review.review.createdAt = new Date();
        review.review.updatedAt = review.review.createdAt;
    }

    createReview(review)
        .then(review => res.status(201).send(review))
        .catch(error => res.status(error.status).send(error));
});

router.put('/album/:albumId/reviews/:reviewId', checkAuth, (req, res) => {
    const review = req.body;
    review.contentId = req.params.albumId;
    review.authorUid = req.user.uid;
    review.contentType = ALBUM;
    updateUserReview(req.params.reviewId, review)
        .then(review => res.status(200).send(review))
        .catch(error => res.status(error.status).send(error));
});

export default router;
