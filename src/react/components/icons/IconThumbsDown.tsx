import type { FC } from 'react'
import { faThumbsDown as regularThumbsDown } from '@fortawesome/free-regular-svg-icons'
import { faThumbsDown as solidThumbsDown } from '@fortawesome/free-solid-svg-icons'

import IconBase from './IconBase'

interface Props {
  color?: string
  solid?: boolean
}

const IconThumbsDown: FC<Props> = ({ color, solid = false }) => (
  <IconBase icon={solid ? solidThumbsDown : regularThumbsDown} color={color} />
)

export default IconThumbsDown
