import type { FC } from 'react'
import { useState } from 'react'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import type { ThemeUIStyleObject } from 'theme-ui'
import { Heading, Box, Grid } from 'theme-ui'

import type { AlbumReview } from '@/types/graphql-schemas'
import Select from '@/components/common/Select'
import Skeleton from '@/components/common/Skeleton'
import UserReviewCard from '@/components/common/UserReviewCard'

const messages = defineMessages({
  reviews: { id: 'musicritic.album-page.reviews' },
  sortByRecent: { id: 'musicritic.album-page.reviews.sort-by.recent' },
  sortByRating: { id: 'musicritic.album-page.reviews.sort-by.rating' },
})

const headerStyles: ThemeUIStyleObject = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}

interface Props {
  loading: boolean
  reviews?: AlbumReview[]
}

const AlbumReviewSection: FC<Props> = ({
  reviews = [...Array(6)],
  loading,
}) => {
  const [sortBy, setSortBy] = useState('recent')
  const { formatMessage } = useIntl()
  const reviewCount = reviews.length

  return (
    <Box>
      <Heading as="h3" variant="section" sx={headerStyles}>
        <Skeleton
          loading={loading}
          variant="text.section"
          width={160}
          count={2}
        >
          <FormattedMessage {...messages.reviews} /> ({reviewCount})
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="recent">
              {formatMessage(messages.sortByRecent)}
            </option>
            <option value="rating">
              {formatMessage(messages.sortByRating)}
            </option>
          </Select>
        </Skeleton>
      </Heading>
      <Grid columns={[1, 1, 1, 1, 2]} gap={2}>
        {reviews.map((review: AlbumReview) => (
          <UserReviewCard key={review.id} review={review} loading={loading} />
        ))}
      </Grid>
    </Box>
  )
}

export default AlbumReviewSection
