import type { MutationReviewAlbumArgs } from '@/types/graphql-schemas'

import type { Context } from '../context'

export const Mutation = {
  reviewAlbum: async (
    _: unknown,
    { albumId, review }: MutationReviewAlbumArgs,
    { firestore, firebase }: Context
  ) => {
    const newReviewRef = firestore.albumReviews.doc()
    const newReview = {
      id: newReviewRef.id,
      albumId,
      ...review,
      author: 'anonymous', // TODO Change to user who reuquested the mutation via Authorization header
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }

    await newReviewRef.set(newReview)

    return newReview
  },
}
