import type { FC } from 'react'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'

import IconBase from './IconBase'

interface Props {
  color?: string
  solid?: boolean
}

const IconStar: FC<Props> = ({ color, solid = false }) => (
  <IconBase icon={solid ? solidStar : regularStar} color={color} />
)

export default IconStar
