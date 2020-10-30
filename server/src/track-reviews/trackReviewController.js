/* @flow */

import express from 'express';
import checkAuth from '../firebase/firebaseAuthHandler';
import {
    createTrackReview,
    getUserTrackReview,
} from './trackReviewCollections';

const router = express.Router();

router.get('/track/:id/reviews/me', checkAuth, (req, res) => {
    const trackId = req.params.id;
    const authorUid = req.user.uid;
    getUserTrackReview(trackId, authorUid)
        .then(reviews => {
            reviews.size === 0
                ? res.status(204).send()
                : res.status(200).send(reviews.docs[0]);
        })
        .catch(error => res.status(error.status).send(error));
});

router.post('/track/:id/reviews', checkAuth, (req, res) => {
    const review = req.body;
    review.trackId = req.params.id;
    review.authorUid = req.user.uid;
    createTrackReview(review)
        .then(review => res.status(201).send(review))
        .catch(error => res.status(error.status).send(error));
});

export default router;
