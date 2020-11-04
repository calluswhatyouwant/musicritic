/* @flow */

import { db } from '../firebase/firebaseAdmin';

type ReviewModel = {
    id: string | null,
    authorUid: string,
    contentId: string,
    rating: number,
    review: string | null,
    contentType: 'track' | 'album',
};

export const Reviews = { track: db.collection('track-reviews') };

export const createReview = async (review: ReviewModel) => {
    const addedReviews = await getUserReview(
        review.contentId,
        review.authorUid,
        review.contentType
    );
    if (addedReviews.size > 0) {
        throw {
            status: 500,
            message: `${contentType} already reviewed by the user`,
        };
    }
    const ref = Reviews[review.contentType].doc();
    review.id = ref.id;
    await ref.set(review);
    return review;
};

export const getUserReview = (
    contentId: string,
    authorUid: string,
    contentType: string
) => {
    return Reviews[contentType]
        .where('authorUid', '==', authorUid)
        .where('trackId', '==', contentId)
        .get();
};

export const updateUserReview = async (
    reviewId: string,
    updatedReview: ReviewModel
) => {
    const ref = Reviews[updatedReview.contentType].doc(reviewId);
    const review = (await ref.get()).data();
    if (!review)
        throw {
            status: 500,
            message: 'Review not found',
        };

    if (updatedReview.authorUid !== review.authorUid)
        throw {
            status: 500,
            message: 'Not authorized to edit review from others',
        };

    if (updatedReview.trackId !== review.trackId)
        throw {
            status: 500,
            message: `Cannot change the ${updatedReview.contentType} which is being reviewed`,
        };

    ref.set(updatedReview);
    return updatedReview;
};
