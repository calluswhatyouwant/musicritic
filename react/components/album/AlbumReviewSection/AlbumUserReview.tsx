import type { FC } from 'react'
import { FormattedDate } from 'react-intl'
import { Box, Flex, Image, Paragraph, Text } from 'theme-ui'

import type { AlbumReview } from '@/types/graphql-schemas'
import Rating from '@/components/common/Rating'
import Skeleton from '@/components/common/Skeleton'

import AlbumReviewReactions from './AlbumReviewReactions'

interface Props {
  review: AlbumReview
  loading: boolean
}

const AlbumUserReview: FC<Props> = ({ review, loading }) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'muted.2',
      padding: 4,
      borderRadius: 4,
    }}
  >
    <Flex sx={{ marginBottom: 4, alignItems: 'center' }}>
      <Skeleton loading={loading} sx={{ height: 36, width: 36 }}>
        <Image
          alt={review.author.name}
          src={review.author.image ?? ''}
          variant="avatar"
        />
      </Skeleton>
      <Flex
        sx={{ flexDirection: 'column', marginLeft: 2, marginRight: 'auto' }}
      >
        <Text sx={{ fontWeight: 'bold', marginBottom: '2px' }}>
          <Skeleton loading={loading} sx={{ height: 18, width: 120 }}>
            {review.author.name}
          </Skeleton>
        </Text>
        <Text sx={{ color: 'muted.3', fontSize: 1 }}>
          <Skeleton loading={loading} sx={{ height: 16, width: 128 }}>
            <FormattedDate
              value={new Date(review.updatedAt)}
              day="numeric"
              month="long"
              year="numeric"
            />
          </Skeleton>
        </Text>
      </Flex>
      <Skeleton loading={loading} sx={{ height: 16, width: 80 }}>
        <Rating value={review.rating} />
      </Skeleton>
    </Flex>
    <Skeleton
      loading={loading}
      sx={{ height: 16, marginBottom: '2px' }}
      count={6}
    >
      <Paragraph sx={{ lineHeight: 1.25 }}>{review.post}</Paragraph>
    </Skeleton>
    <Flex
      sx={{
        justifyContent: 'flex-end',
        width: '100%',
        paddingTop: 2,
        borderRadius: 4,
        gap: 3,
      }}
    >
      <Skeleton loading={loading} sx={{ width: 48, height: 24 }} count={2}>
        <AlbumReviewReactions upvotes={10} downvotes={2} />
      </Skeleton>
    </Flex>
  </Box>
)

export default AlbumUserReview
