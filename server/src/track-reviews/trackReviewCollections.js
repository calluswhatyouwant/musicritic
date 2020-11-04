/* @flow */

import { db, auth } from '../firebase/firebaseAdmin';

type TrackReviewModel = {
    id: string | null,
    authorUid: string,
    trackId: string,
    rating: number,
    review?: {
        createdAt: Date,
        updatedAt: Date,
        content: string,
    },
};

export const TrackReviews = db.collection('track-reviews');

export const createTrackReview = async (review: TrackReviewModel) => {
    const addedTrackReviews = (
        await getUserTrackReview(review.trackId, review.authorUid)
    ).docs.map(review => review.data());

    if (addedTrackReviews.length > 0) {
        return await updateUserTrackReview(addedTrackReviews[0].id, review);
    }

    const ref = TrackReviews.doc();
    review.id = ref.id;
    await ref.set(review);
    return review;
};

export const getUserTrackReview = (trackId: string, authorUid: string) => {
    return TrackReviews.where('authorUid', '==', authorUid)
        .where('trackId', '==', trackId)
        .get();
};

export const getTrackReviews = async (trackId: string) => {
    const reviews = await TrackReviews.where('trackId', '==', trackId).get();
    return getReviewersInformation(reviews);
};

const getReviewersInformation = async (reviews) => {
    const usersIds = reviews.docs.map(review => ({ uid: review.data().authorUid }));
    const { users } = await auth.getUsers(usersIds);
    return reviews.docs.map(
        (review, i) => 
        ({ ...review.data(), author: 
            {
                displayName: users[i].displayName,
                avatarUrl: users[i].photoURL,
                authorUid: users[i].uid,
            } }));
}

export const updateUserTrackReview = async (
    reviewId: string,
    updatedTrackReview: TrackReviewModel
) => {
    updatedTrackReview.id = reviewId;
    const ref = TrackReviews.doc(reviewId);
    const review = (await ref.get()).data();
    if (!review)
        throw {
            status: 500,
            message: 'Review not found',
        };

    if (updatedTrackReview.authorUid !== review.authorUid)
        throw {
            status: 500,
            message: 'Not authorized to edit review from others',
        };

    if (updatedTrackReview.trackId !== review.trackId)
        throw {
            status: 500,
            message: 'Cannot change the track which is being reviewed',
        };

    console.log(review);
    if (updatedTrackReview.review) {
        if (
            review.review &&
            updatedTrackReview.review.createdAt !== review.review.createdAt
        )
            throw {
                status: 500,
                message: 'Cannot change the creation date of a review',
            };
        updatedTrackReview.review.updatedAt = new Date();
    }

    ref.set(updatedTrackReview);
    return updatedTrackReview;
};
