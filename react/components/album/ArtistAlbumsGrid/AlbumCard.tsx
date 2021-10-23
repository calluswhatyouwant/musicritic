import type { FC } from 'react'
import type { AlbumSimplified } from 'spotify-web-sdk'
import { Card, Text, Flex } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

import Link from '@/components/common/Link'
import Skeleton from '@/components/common/Skeleton'
import SkeletonImage from '@/components/common/SkeletonImage'

const cardStyles: ThemeUIStyleObject = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  ':hover': {
    backgroundColor: 'muted.1',
  },
}

const truncateTextStyles: ThemeUIStyleObject = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

interface AlbumCardProps {
  album?: AlbumSimplified
  loading: boolean
}

const AlbumCard: FC<AlbumCardProps> = ({ album, loading }) => (
  <Link href={album ? `/albums/${album?.id}` : '/'} variant="plain">
    <Card key={album?.id} sx={cardStyles} variant="compact">
      <SkeletonImage
        loading={loading}
        alt={album?.name ?? ''}
        src={album?.imageUrl ?? ''}
        height={48}
        width={48}
      />
      <Flex sx={{ flexDirection: 'column', gap: 2 }}>
        <Skeleton
          loading={loading}
          variant="text.body"
          count={2}
          width={[200, 160, 160, 200, 256, 128]}
        >
          <Text variant="body" sx={{ ...truncateTextStyles, color: 'muted.5' }}>
            {album?.name}
          </Text>
          <Text
            variant="body"
            sx={{
              ...truncateTextStyles,
              color: 'muted.4',
            }}
          >
            {album?.stringArtists}
          </Text>
        </Skeleton>
      </Flex>
    </Card>
  </Link>
)

export default AlbumCard
