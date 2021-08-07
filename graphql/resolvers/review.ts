import type {
  MutationReviewAlbumArgs,
  MutationReviewTrackArgs,
} from '@/types/graphql-schemas'

import { upsertAlbumReview, upsertTrackReview } from '../business/reviews'
import { protectedResolver } from './util'

export const Mutation = {
  reviewAlbum: protectedResolver<unknown, MutationReviewAlbumArgs>(
    async (_, { albumId, review }, { firestore, auth }) => {
      const userId = auth?.user.id ?? ''

      const newReview = await upsertAlbumReview(
        albumId,
        userId,
        review,
        firestore.reviews
      )

      return { ...newReview, albumId: newReview.contentId, author: auth?.user }
    }
  ),
  reviewTrack: protectedResolver<unknown, MutationReviewTrackArgs>(
    async (_, { trackId, review }, { firestore, auth }) => {
      const userId = auth?.user.id ?? ''

      const newReview = await upsertTrackReview(
        trackId,
        userId,
        review,
        firestore.reviews
      )

      return { ...newReview, trackId: newReview.contentId, author: auth?.user }
    }
  ),
}
