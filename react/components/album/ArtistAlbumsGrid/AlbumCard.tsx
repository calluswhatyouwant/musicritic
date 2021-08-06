import React from 'react'
import type { FC } from 'react'
import type { Album } from 'spotify-web-sdk'
import { Card, Image, Text, Flex } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

const cardStyles: ThemeUIStyleObject = {
  display: 'flex',
  border: '1px solid black',
  padding: 2,
  alignItems: 'center',
  gap: 2,
  borderRadius: 4,
}

const truncateTextStyles: ThemeUIStyleObject = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

interface AlbumCardProps {
  album: Album
}

const AlbumCard: FC<AlbumCardProps> = ({ album }) => (
  <Card key={album.id} sx={cardStyles}>
    <Image
      alt={album.name}
      src={album.imageUrl}
      sx={{ height: '3rem', minWidth: '3rem' }}
    />
    <Flex sx={{ flexDirection: 'column' }}>
      <Text sx={truncateTextStyles}>{album.name}</Text>
      <Text
        sx={{
          ...truncateTextStyles,
          color: 'gray',
        }}
      >
        {album.stringArtists}
      </Text>
    </Flex>
  </Card>
)

export default AlbumCard
