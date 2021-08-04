import type { MutationReviewAlbumArgs } from '@/types/graphql-schemas'

import type { AlbumReviewModel } from '../business/reviews'
import {
  createAlbumReview,
  getAlbumReviewFromUser,
  updateAlbumReview,
} from '../business/reviews'
import type { Context } from '../context'

export const Mutation = {
  reviewAlbum: async (
    _: unknown,
    { albumId, review }: MutationReviewAlbumArgs,
    { firestore, auth }: Context
  ) => {
    if (!auth) return {}

    const oldReview = await getAlbumReviewFromUser(
      albumId,
      auth.user.id ?? ''
    )(firestore.albumReviews)

    const newReview = oldReview.empty
      ? createAlbumReview(
          albumId,
          auth.user.id ?? '',
          review
        )(firestore.albumReviews)
      : updateAlbumReview(
          oldReview.docs[0].data() as AlbumReviewModel,
          review
        )(firestore.albumReviews)

    return { ...(await newReview), author: auth?.user }
  },
}
