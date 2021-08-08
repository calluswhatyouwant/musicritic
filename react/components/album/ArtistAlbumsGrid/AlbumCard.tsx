import type { FC } from 'react'
import type { AlbumSimplified } from 'spotify-web-sdk'
import { Card, Image, Text, Flex } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

import Link from '@/components/common/Link'
import Skeleton from '@/components/common/Skeleton'

const cardStyles: ThemeUIStyleObject = {
  display: 'flex',
  border: '1px solid black',
  padding: 2,
  alignItems: 'center',
  gap: 2,
  borderRadius: 4,
  ':hover': {
    backgroundColor: 'muted.0',
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
  <Link
    href={album ? `/albums/${album?.id}` : '/'}
    sx={{ textDecoration: 'none' }}
  >
    <Card key={album?.id} sx={cardStyles}>
      <Skeleton loading={loading} height={48} width={48}>
        <Image
          alt={album?.name}
          src={album?.imageUrl}
          sx={{ height: 48, minWidth: 48 }}
        />
      </Skeleton>
      <Flex sx={{ flexDirection: 'column', gap: 2 }}>
        <Skeleton
          loading={loading}
          variant="text.body"
          count={2}
          width={[200, 160, 160, 200, 256, 128]}
        >
          <Text variant="body" sx={{ ...truncateTextStyles, color: 'muted.4' }}>
            {album?.name}
          </Text>
          <Text
            variant="body"
            sx={{
              ...truncateTextStyles,
              color: 'muted.3',
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
