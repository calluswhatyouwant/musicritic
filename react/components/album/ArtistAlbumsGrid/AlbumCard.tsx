import type { FC } from 'react'
import type { AlbumSimplified } from 'spotify-web-sdk'
import { Card, Image, Text, Flex } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

import Link from '@/components/common/Link'

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
  album: AlbumSimplified
}

const AlbumCard: FC<AlbumCardProps> = ({ album }) => (
  <Link href={`/albums/${album?.id}`} sx={{ textDecoration: 'none' }}>
    <Card key={album?.id} sx={cardStyles}>
      <Image
        alt={album?.name}
        src={album?.imageUrl}
        sx={{ height: '3rem', minWidth: '3rem' }}
      />
      <Flex sx={{ flexDirection: 'column', gap: 1 }}>
        <Text sx={{ ...truncateTextStyles, color: 'muted.4' }}>
          {album?.name}
        </Text>
        <Text
          sx={{
            ...truncateTextStyles,
            color: 'muted.3',
          }}
        >
          {album?.stringArtists}
        </Text>
      </Flex>
    </Card>
  </Link>
)

export default AlbumCard
