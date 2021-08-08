import type { FC } from 'react'
import { useState } from 'react'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import type { ThemeUIStyleObject } from 'theme-ui'
import { Box, Flex, Grid, Text } from 'theme-ui'

import type { AlbumReview } from '@/types/graphql-schemas'
import Select from '@/components/common/Select'
import Skeleton from '@/components/common/Skeleton'

import AlbumUserReview from './AlbumUserReview'

const messages = defineMessages({
  reviews: { id: 'musicritic.album-page.reviews' },
  sortByRecent: { id: 'musicritic.album-page.reviews.sort-by.recent' },
  sortByRating: { id: 'musicritic.album-page.reviews.sort-by.rating' },
})

const styles: ThemeUIStyleObject = {
  flexDirection: ['column', 'column', 'row'],
  marginBottom: [3, 3, 0],
  width: '100%',
  justifyContent: 'space-between',
  paddingRight: 1,
}

interface Props {
  reviews: AlbumReview[]
  loading: boolean
}

const AlbumReviewSection: FC<Props> = ({ reviews, loading }) => {
  const [sortBy, setSortBy] = useState('recent')
  const { formatMessage } = useIntl()
  const reviewCount = reviews.length

  return (
    <Box>
      <Flex sx={styles}>
        <Text variant="sectionHeader">
          <Skeleton loading={loading} sx={{ height: 36, width: 160 }}>
            <FormattedMessage {...messages.reviews} /> ({reviewCount})
          </Skeleton>
        </Text>
        <Skeleton loading={loading} sx={{ height: 36, width: 160 }}>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="recent">
              {formatMessage(messages.sortByRecent)}
            </option>
            <option value="rating">
              {formatMessage(messages.sortByRating)}
            </option>
          </Select>
        </Skeleton>
      </Flex>
      <Grid columns={[1, 1, 1, 1, 2]} gap={2}>
        {reviews.map((review) => (
          <AlbumUserReview key={review.id} review={review} loading={loading} />
        ))}
      </Grid>
    </Box>
  )
}

export default AlbumReviewSection
