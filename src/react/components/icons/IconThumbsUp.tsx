import type { FC } from 'react'
import { faThumbsUp as regularThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons'

import IconBase from './IconBase'

interface Props {
  color?: string
  solid?: boolean
}

const IconThumbsUp: FC<Props> = ({ color, solid = false }) => (
  <IconBase icon={solid ? solidThumbsUp : regularThumbsUp} color={color} />
)

export default IconThumbsUp
