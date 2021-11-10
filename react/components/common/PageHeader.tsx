import { Box, Button, Flex, Heading, Link } from '@theme-ui/components'
import type { Track } from 'spotify-web-sdk'
import { defineMessages, FormattedMessage } from 'react-intl'
import type { ThemeUIStyleObject } from 'theme-ui'
import type { PropsWithChildren } from 'hoist-non-react-statics/node_modules/@types/react'

import RatingBadge from '@/components/common/RatingBadge'
import SkeletonImage from '@/components/common/SkeletonImage'
import Skeleton from '@/components/common/Skeleton'

const messages = defineMessages({
  byArtists: { id: 'musicritic.album-page.by-artists' },
  releaseDate: { id: 'musicritic.album-page.release-date' },
  openOnSpotify: { id: 'musicritic.album-page.open-on-spotify' },
})

const containerStyles: ThemeUIStyleObject = {
  flexDirection: ['column', 'column', 'row'],
  backgroundColor: 'muted.0',
  width: '100%',
  padding: [3, 4, 6, 16],
  justifyContent: 'space-between',
  alignItems: 'center',
}

interface Props {
  track?: Track
  loading?: boolean
  rating?: number
  variant?: 'album' | 'track'
}

const TrackHeader = ({
  track,
  rating = 5,
  loading = false,
  variant = 'track',
  children,
}: PropsWithChildren<Props>) => {
  const releaseYear = track?.releaseYear ?? ''

  return (
    <Flex sx={containerStyles}>
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
        {children}
        <Box>
          <Heading variant="title">{track?.name ?? ''}</Heading>
          <Heading variant="subtitle">
            <FormattedMessage
              {...messages.byArtists}
              values={{ artists: track?.mainArtists[0].name }}
            />
          </Heading>
          {variant === 'track' && <Box>{track?.album?.name ?? ''}</Box>}
          <Box sx={{ marginBottom: 4 }}>
            <FormattedMessage
              {...messages.releaseDate}
              values={{ date: releaseYear }}
            />{' '}
            · {track?.length ?? ''}
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
