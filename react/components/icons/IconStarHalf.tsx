import type { FC } from 'react'
import { faStarHalf as regularStarHalf } from '@fortawesome/free-regular-svg-icons'
import { faStarHalf as solidStarHalf } from '@fortawesome/free-solid-svg-icons'

import IconBase from './IconBase'

interface Props {
  color?: string
  solid?: boolean
}

const IconStarHalf: FC<Props> = ({ color, solid = false }) => (
  <IconBase icon={solid ? solidStarHalf : regularStarHalf} color={color} />
)

export default IconStarHalf
