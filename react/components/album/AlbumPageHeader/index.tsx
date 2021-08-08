import type { FC } from 'react'
import type { Album } from 'spotify-web-sdk'
import { Flex, Image } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

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
}

const AlbumPageHeader: FC<Props> = ({ album }) => (
  <Flex
    sx={{
      flexDirection: ['column', 'column', 'row'],
      backgroundColor: 'muted.0',
      width: '100%',
      padding: [3, 4, 24, 32, 64],
    }}
  >
    <Flex sx={containerStyles}>
      <Image
        alt={album.name}
        src={album.imageUrl}
        sx={{ maxHeight: 280, maxWidth: 280 }}
      />
    </Flex>
    <Flex sx={detailsContainerStyles}>
      <AlbumMetadata album={album} />
    </Flex>
    <Flex sx={containerStyles}>
      <AlbumRatingBadge rating={4.9} />
    </Flex>
  </Flex>
)

export default AlbumPageHeader
