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

router.get('/track/:trackId/reviews', (req, res) => {
    const trackId = req.params.trackId;
    getReviews(trackId, 'track')
        .then(reviews => res.status(200).send(reviews))
        .catch(error => res.status(error.status).send(error));
});

router.get('/track/:trackId/reviews/me', checkAuth, (req, res) => {
    const trackId = req.params.trackId;
    const authorUid = req.user.uid;
    getUserReview(trackId, authorUid, 'track')
        .then(reviews => {
            reviews.size === 0
                ? res.status(204).send()
                : res.status(200).send(reviews.docs[0]);
        })
        .catch(error => res.status(error.status).send(error));
});

router.post('/track/:trackId/reviews', checkAuth, (req, res) => {
    const review = req.body;
    review.contentId = req.params.trackId;
    review.authorUid = req.user.uid;
    review.contentType = 'track';
    if (review.review && !review.review.createdAt) {
        review.review.createdAt = new Date();
        review.review.updatedAt = review.review.createdAt;
    }

    createReview(review)
        .then(review => res.status(201).send(review))
        .catch(error => res.status(error.status).send(error));
});

router.put('/track/:trackId/reviews/:reviewId', checkAuth, (req, res) => {
    const review = req.body;
    review.contentId = req.params.trackId;
    review.authorUid = req.user.uid;
    review.contentType = 'track';
    updateUserReview(req.params.reviewId, review)
        .then(review => res.status(200).send(review))
        .catch(error => res.status(error.status).send(error));
});

export default router;
