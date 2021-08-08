import type { FC } from 'react'
import type { Album } from 'spotify-web-sdk'
import { Flex, Image } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

import Skeleton from '@/components/common/Skeleton'

import AlbumRatingBadge from './AlbumRatingBadge'
import AlbumMetadata from './AlbumMetadata'

const containerStyles: ThemeUIStyleObject = {
  alignItems: 'center',
  justifyContent: 'center',
  width: ['100%', '100%', 'fit-content'],
}

const detailsContainerStyles: ThemeUIStyleObject = {
  padding: [24, 24, 32],
  width: ['100%', '100%', '50%'],
  flexGrow: 1,
  justifyContent: ['center', 'center', 'left'],
  alignItems: 'center',
  textAlign: ['center', 'center', 'left'],
}

interface Props {
  album: Album
  loading: boolean
}

const AlbumPageHeader: FC<Props> = ({ album, loading }) => (
  <Flex
    sx={{
      flexDirection: ['column', 'column', 'row'],
      backgroundColor: 'muted.0',
      width: '100%',
      padding: [3, 4, 24, 32, 64],
    }}
  >
    <Flex sx={containerStyles}>
      <Skeleton loading={loading} sx={{ height: 280, width: 280 }}>
        <Image
          alt={album?.name}
          src={album?.imageUrl}
          sx={{ maxHeight: 280, maxWidth: 280 }}
        />
      </Skeleton>
    </Flex>
    <Flex sx={detailsContainerStyles}>
      <AlbumMetadata loading={loading} album={album} />
    </Flex>
    <Flex sx={containerStyles}>
      <AlbumRatingBadge loading={loading} rating={4.9} />
    </Flex>
  </Flex>
)

export default AlbumPageHeader
