import { Box, Button, Flex, Heading, Link } from '@theme-ui/components'
import type { Track } from 'spotify-web-sdk'
import { defineMessages, FormattedMessage } from 'react-intl'

import RatingBadge from '@/components/common/RatingBadge'
import SkeletonImage from '@/components/common/SkeletonImage'
import Skeleton from '@/components/common/Skeleton'

const messages = defineMessages({
  byArtists: { id: 'musicritic.album-page.by-artists' },
  releaseDate: { id: 'musicritic.album-page.release-date' },
  openOnSpotify: { id: 'musicritic.album-page.open-on-spotify' },
})

interface Props {
  track?: Track
  loading?: boolean
  rating?: number
}

const TrackHeader = ({ track, rating = 5, loading = false }: Props) => {
  return (
    <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', p: 6 }}>
      <Flex sx={{ alignItems: 'center' }}>
        <Flex sx={{ marginRight: 4 }}>
          <SkeletonImage
            loading={loading}
            alt={track?.album?.name ?? ''}
            src={track?.album?.imageUrl ?? ''}
            height={280}
            width={280}
          />
        </Flex>
        <Box>
          <Heading variant="title">{track?.name ?? ''}</Heading>
          <Box>por {track?.mainArtists[0].name}</Box>
          <Box>{track?.album?.name ?? ''}</Box>
          <Box>
            {track?.album?.releaseYear ?? ''} · {track?.length ?? ''}
          </Box>
          <Link href={track?.uri ?? '/'} variant="button">
            <FormattedMessage {...messages.openOnSpotify} />
          </Link>
        </Box>
      </Flex>
      <RatingBadge rating={rating} />
    </Flex>
  )
}

export default TrackHeader
