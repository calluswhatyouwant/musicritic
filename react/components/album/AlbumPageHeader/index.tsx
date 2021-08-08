import type { FC } from 'react'
import type { Album } from 'spotify-web-sdk'
import { Flex, Image } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

import Skeleton from '@/components/common/Skeleton'

import AlbumRatingBadge from './AlbumRatingBadge'
import AlbumMetadata from './AlbumMetadata'

const containerStyles: ThemeUIStyleObject = {
  flexDirection: ['column', 'column', 'row'],
  backgroundColor: 'muted.0',
  width: '100%',
  padding: [3, 4, 6, 16],
}

const columnStyles: ThemeUIStyleObject = {
  alignItems: 'center',
  justifyContent: 'center',
  width: ['100%', '100%', 'fit-content'],
}

const detailsContainerStyles: ThemeUIStyleObject = {
  padding: [24, 24, 32],
  width: ['100%', '100%', '50%'],
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: ['center', 'center', 'left'],
  textAlign: ['center', 'center', 'left'],
}

interface Props {
  loading: boolean
  album?: Album
  averageRating?: number
}

const AlbumPageHeader: FC<Props> = ({ album, loading, averageRating }) => (
  <Flex sx={containerStyles}>
    <Flex sx={columnStyles}>
      <Skeleton loading={loading} height={280} width={280}>
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
    <Flex sx={columnStyles}>
      <Skeleton
        loading={loading}
        shape="circle"
        height={[64, 64, 128]}
        width={[64, 64, 128]}
      >
        {averageRating && <AlbumRatingBadge rating={averageRating} />}
      </Skeleton>
    </Flex>
  </Flex>
)

export default AlbumPageHeader
