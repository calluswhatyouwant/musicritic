/* @flow */

import express from 'express';
import checkAuth from '../firebase/firebaseAuthHandler';
import {
    createReview,
    getUserReview,
    updateUserReview,
} from './reviewCollections';

const router = express.Router();

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
    createReview(review)
        .then(review => res.status(201).send(review))
        .catch(error => res.status(error.status).send(error));
});

router.put('/track/:trackId/reviews/:reviewId', checkAuth, (req, res) => {
    const review = req.body;
    review.contentId = req.params.trackId;
    review.id = req.params.reviewId;
    review.authorUid = req.user.uid;
    review.contentType = 'track';
    updateUserReview(review.id, review)
        .then(review => res.status(200).send(review))
        .catch(error => res.status(error.status).send(error));
});

export default router;
