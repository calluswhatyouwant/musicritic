import { Box, Button, Heading } from '@theme-ui/components'
import type { Track } from 'spotify-web-sdk'

import RatingBadge from '@/components/common/RatingBadge'
import SkeletonImage from '@/components/common/SkeletonImage'
import Skeleton from '@/components/common/Skeleton'

interface Props {
  track?: Track
  loading?: boolean
}

const TrackHeader = ({ track, loading = false }: Props) => {
  return (
    <div>
      <div>
        <div>
          <SkeletonImage
            loading={loading}
            alt={track?.album?.name ?? ''}
            src={track?.album?.imageUrl ?? ''}
            height={280}
            width={280}
          />
        </div>
        <div>
          <Heading as="h2">{track?.name ?? ''}</Heading>
          <Box>por {track?.mainArtists[0].name}</Box>
          <Box>{track?.album?.name ?? ''}</Box>
          <Button>Abrir no Spotify</Button>
        </div>
      </div>
      <div>
        <RatingBadge rating={5} />
      </div>
    </div>
  )
}

export default TrackHeader
