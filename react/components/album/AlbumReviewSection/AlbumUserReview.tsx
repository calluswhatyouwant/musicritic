import type { FC } from 'react'
import { FormattedDate } from 'react-intl'
import { Box, Flex, Image, Paragraph, Text } from 'theme-ui'

import AlbumReviewReactions from './AlbumReviewReactions'

interface Props {
  review: any
}

const AlbumUserReview: FC<Props> = ({ review }) => (
  <Box sx={{ border: '1px solid black', padding: 3, borderRadius: 4 }}>
    <Flex sx={{ marginBottom: 3, alignItems: 'center' }}>
      <Image
        alt={review.author.name}
        src={review.author.image}
        sx={{ borderRadius: '100%', height: 36, width: 36 }}
      />
      <Flex
        sx={{ flexDirection: 'column', marginLeft: 2, marginRight: 'auto' }}
      >
        <Text sx={{ fontWeight: 'bold' }}>{review.author.name}</Text>
        <FormattedDate
          value={new Date(review.updatedAt)}
          day="numeric"
          month="long"
          year="numeric"
        />
      </Flex>
      <Paragraph sx={{ lineHeight: 1.25 }}>{review.rating}</Paragraph>
    </Flex>
    <Paragraph sx={{ lineHeight: 1.25 }}>{review.post}</Paragraph>
    <AlbumReviewReactions />
  </Box>
)

export default AlbumUserReview
