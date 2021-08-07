import type { FC } from 'react'

import IconStar from '../icons/IconStar'
import IconStarHalf from '../icons/IconStarHalf'

interface Props {
  value: number
}

const Rating: FC<Props> = ({ value }) => {
  const fullStars = Math.floor(value)

  const icons = [...Array(fullStars)].map((_, index) => (
    <IconStar key={index} color="#FDE74C" solid />
  ))

  if (fullStars !== value) icons.push(<IconStarHalf color="#FDE74C" solid />)

  return <>{icons}</>
}

export default Rating
