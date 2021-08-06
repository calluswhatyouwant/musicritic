import type { FC } from 'react'
import { Badge } from 'theme-ui'
import type { ThemeUIStyleObject } from 'theme-ui'

const ratingBadgeStyles: ThemeUIStyleObject = {
  border: '4px solid black',
  padding: [2, 2, 3],
  borderRadius: '100%',
  minHeight: [60, 60, 120],
  minWidth: [60, 60, 120],
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
}

const AlbumRatingBadge: FC<Props> = ({ rating }) => (
  <Badge sx={ratingBadgeStyles}>{rating}</Badge>
)

export default AlbumRatingBadge
