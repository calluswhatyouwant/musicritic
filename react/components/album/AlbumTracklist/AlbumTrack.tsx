import type { FC } from 'react'
import type { TrackSimplified } from 'spotify-web-sdk'
import { Flex, Text } from 'theme-ui'

import Link from '../../common/Link'
import Skeleton from '../../common/Skeleton'

interface Props {
  loading: boolean
  track?: TrackSimplified
}

const AlbumTrack: FC<Props> = ({ track, loading }) => (
  <Link href={loading ? `/tracks/${track?.id}` : '/'} variant="plain" sx={{}}>
    <Flex
      sx={{
        borderTop: '1px solid',
        borderColor: 'muted.2',
        padding: 2,
        alignItems: 'center',
        ':hover': {
          cursor: 'pointer',
          backgroundColor: 'muted.1',
        },
      }}
    >
      <Skeleton
        loading={loading}
        variant="text.body"
        width={16}
        sx={{ marginRight: 4 }}
      >
        <Text variant="body" sx={{ minWidth: '2rem', color: 'muted.4' }}>
          {track?.trackNumber}
        </Text>
      </Skeleton>
      <Skeleton loading={loading} variant="text.body" width={200}>
        <Text variant="body">{track?.name}</Text>
      </Skeleton>
    </Flex>
  </Link>
)

export default AlbumTrack
