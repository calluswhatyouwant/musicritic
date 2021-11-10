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
  imgURL?: string
  imgALT?: string
  loading?: boolean
  rating?: number
}

const PageHeader = ({
  imgURL,
  imgALT,
  rating = 5,
  loading = false,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Flex sx={containerStyles}>
      <Flex sx={{ alignItems: 'center' }}>
        <Flex sx={{ marginRight: 4 }}>
          <SkeletonImage
            loading={loading}
            alt={imgALT ?? ''}
            src={imgURL ?? ''}
            height={280}
            width={280}
          />
        </Flex>
        {children}
      </Flex>
      <RatingBadge rating={rating} />
    </Flex>
  )
}

export default PageHeader
