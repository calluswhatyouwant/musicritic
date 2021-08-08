import type { FC } from 'react'
import { FormattedDate } from 'react-intl'
import type { ThemeUICSSObject } from 'theme-ui'
import { Flex, Image, Text } from 'theme-ui'

import type { AlbumReview } from '@/types/graphql-schemas'
import Rating from '@/components/common/Rating'
import Skeleton from '@/components/common/Skeleton'

interface Props {
  loading: boolean
  review?: AlbumReview
}

const CardHeader: FC<Props> = ({ review, loading }) => (
  <Flex sx={{ marginBottom: 4, alignItems: 'center' }}>
    <Skeleton loading={loading} height={40} width={40}>
      <Image
        alt={review?.author.name}
        src={review?.author.image ?? ''}
        variant="avatar"
      />
    </Skeleton>
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
      <Text variant="small" sx={{ color: 'muted.3' }}>
        <Skeleton loading={loading} variant="text.small" width={128}>
          <FormattedDate
            value={new Date(review?.updatedAt)}
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
