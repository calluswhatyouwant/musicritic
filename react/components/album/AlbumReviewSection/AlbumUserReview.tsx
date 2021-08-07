import type { FC } from 'react'
import { FormattedDate } from 'react-intl'
import { Box, Flex, Image, Paragraph, Text } from 'theme-ui'

import type { AlbumReview } from '@/types/graphql-schemas'
import Rating from '@/components/common/Rating'

import AlbumReviewReactions from './AlbumReviewReactions'

interface Props {
  review: AlbumReview
}

const AlbumUserReview: FC<Props> = ({ review }) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'muted.2',
      padding: 4,
      borderRadius: 4,
    }}
  >
    <Flex sx={{ marginBottom: 4, alignItems: 'center' }}>
      <Image
        alt={review.author.name}
        src={review.author.image ?? ''}
        variant="avatar"
      />
      <Flex
        sx={{ flexDirection: 'column', marginLeft: 2, marginRight: 'auto' }}
      >
        <Text sx={{ fontWeight: 'bold', marginBottom: '2px' }}>
          {review.author.name}
        </Text>
        <Text sx={{ color: 'muted.3', fontSize: 1 }}>
          <FormattedDate
            value={new Date(review.updatedAt)}
            day="numeric"
            month="long"
            year="numeric"
          />
        </Text>
      </Flex>
      <Rating value={review.rating} />
    </Flex>
    <Paragraph sx={{ lineHeight: 1.25 }}>{review.post}</Paragraph>
    <AlbumReviewReactions upvotes={10} downvotes={2} />
  </Box>
)

export default AlbumUserReview
