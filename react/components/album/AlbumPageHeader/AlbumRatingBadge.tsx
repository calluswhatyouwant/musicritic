import type { FC } from 'react'
import { Badge } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

import Skeleton from '@/components/common/Skeleton'

const ratingBadgeStyles: ThemeUIStyleObject = {
  border: '4px solid black',
  borderRadius: '100%',
  height: [64, 64, 128],
  width: [64, 64, 128],
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  color: 'black',
  fontSize: [5, 5, 6],
  fontWeight: 'bold',
  backgroundColor: 'transparent',
}

interface Props {
  rating: number
  loading: boolean
}

const AlbumRatingBadge: FC<Props> = ({ rating, loading }) => (
  <Skeleton loading={loading} sx={{ ...ratingBadgeStyles, border: 'none' }}>
    <Badge sx={ratingBadgeStyles}>{rating}</Badge>
  </Skeleton>
)

export default AlbumRatingBadge
