import type { FC } from 'react'
import { FormattedDate } from 'react-intl'
import { Flex, Text } from 'theme-ui'

import type { AlbumReview } from '@/types/graphql'
import Rating from '@/components/common/Rating'
import Skeleton from '@/components/common/Skeleton'

import SkeletonImage from '../SkeletonImage'

interface Props {
  loading: boolean
  review?: AlbumReview
}

const CardHeader: FC<Props> = ({ review, loading }) => (
  <Flex sx={{ marginBottom: 4, alignItems: 'center' }}>
    <SkeletonImage
      loading={loading}
      alt={review?.author.name ?? ''}
      src={review?.author.image ?? ''}
      height={40}
      width={40}
    />
    <Flex
      sx={{
        flexDirection: 'column',
        marginLeft: 2,
        marginRight: 'auto',
        gap: '2px',
      }}
    >
      <Text variant="bold">
        <Skeleton loading={loading} variant="text.body" width={128}>
          {review?.author.name}
        </Skeleton>
      </Text>
      <Text variant="small" sx={{ color: 'muted.4' }}>
        <Skeleton loading={loading} variant="text.small" width={128}>
          <FormattedDate
            value={review?.updatedAt}
            day="numeric"
            month="long"
            year="numeric"
          />
        </Skeleton>
      </Text>
    </Flex>
    <Skeleton loading={loading} height={18} width={[48, 48, 90]}>
      <Rating value={review?.rating} />
    </Skeleton>
  </Flex>
)

export default CardHeader
