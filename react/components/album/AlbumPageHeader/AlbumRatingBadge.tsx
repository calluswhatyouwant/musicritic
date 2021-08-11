import type { FC } from 'react'
import { Badge } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

const ratingBadgeStyles: ThemeUIStyleObject = {
  border: '4px solid black',
  borderRadius: '100%',
  height: [64, 64, 128],
  width: [64, 64, 128],
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  color: 'black',
  fontSize: [5, 5, 7],
  backgroundColor: 'transparent',
}

interface Props {
  rating: number
}

const AlbumRatingBadge: FC<Props> = ({ rating }) => (
  <Badge sx={ratingBadgeStyles}>{rating}</Badge>
)

export default AlbumRatingBadge
