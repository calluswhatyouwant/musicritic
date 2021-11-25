import type { FC } from 'react'
import type { Album } from 'spotify-web-sdk'
import { Flex } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

import Skeleton from '@/components/common/Skeleton'
import SkeletonImage from '@/components/common/SkeletonImage'

import AlbumRatingBadge from '../../common/RatingBadge'
import AlbumMetadata from './AlbumMetadata'

const containerStyles: ThemeUIStyleObject = {
  flexDirection: ['column', 'column', 'row'],
  backgroundColor: 'muted.1',
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
      <SkeletonImage
        loading={loading}
        alt={album?.name ?? ''}
        src={album?.imageUrl ?? ''}
        height={280}
        width={280}
      />
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
