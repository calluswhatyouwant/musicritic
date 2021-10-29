/** @jsxImportSource theme-ui */

import type { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-common-types'

interface Props {
  icon: IconDefinition
  color?: string
  size?: 'regular' | 'large'
}

const IconBase: FC<Props> = ({ icon, color, size = 'regular' }) => (
  <FontAwesomeIcon
    icon={icon}
    color={color}
    sx={{ height: size === 'regular' ? '1rem' : '2rem' }}
  />
)

export default IconBase
