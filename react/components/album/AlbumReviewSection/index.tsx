import type { FC } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Box, Grid, Text } from 'theme-ui'

import AlbumUserReview from './AlbumUserReview'

const messages = defineMessages({
  reviews: { id: 'musicritic.album-page.reviews' },
})

interface Props {
  reviews: any[]
}

const AlbumReviewSection: FC<Props> = ({ reviews }) => (
  <Box>
    <Text
      sx={{
        fontSize: 4,
        fontWeight: 'bold',
        marginBottom: 2,
        display: 'block',
      }}
    >
      <FormattedMessage {...messages.reviews} />
    </Text>
    <Grid columns={1} gap={2}>
      {reviews.map((review: any) => (
        <AlbumUserReview key={review.id} review={review} />
      ))}
    </Grid>
  </Box>
)

export default AlbumReviewSection
