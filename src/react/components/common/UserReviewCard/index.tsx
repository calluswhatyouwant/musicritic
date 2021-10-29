import type { FC } from 'react'
import { Card, Flex, Paragraph } from 'theme-ui'

import type { AlbumReview } from 'src/typings/graphql-schemas'
import Skeleton from 'src/react/components/common/Skeleton'

import AlbumReviewReactions from './AlbumReviewReactions'
import CardHeader from './CardHeader'

interface Props {
  loading: boolean
  review?: AlbumReview
}

const AlbumUserReview: FC<Props> = ({ review, loading }) => (
  <Card>
    <CardHeader loading={loading} review={review} />
    <Skeleton loading={loading} variant="text.paragraph" count={4}>
      <Paragraph>{review?.post}</Paragraph>
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
      <Skeleton loading={loading} width={48} height={24} count={2}>
        <AlbumReviewReactions upvotes={10} downvotes={2} />
      </Skeleton>
    </Flex>
  </Card>
)

export default AlbumUserReview
