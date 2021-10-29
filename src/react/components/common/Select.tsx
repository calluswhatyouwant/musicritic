/** @jsxImportSource theme-ui */

import type { ChangeEventHandler, FC, OptionHTMLAttributes } from 'react'
import type { ThemeUIStyleObject } from 'theme-ui'

interface Props {
  value: number | string
  onChange: ChangeEventHandler<HTMLSelectElement>
  children: Array<OptionHTMLAttributes<HTMLOptionElement>>
  sx?: ThemeUIStyleObject
}

const Select: FC<Props> = ({ value, onChange, children, sx = {} }) => (
  <select
    value={value}
    onChange={onChange}
    sx={{
      fontSize: 2,
      height: 28,
      borderRadius: 4,
      backgroundColor: 'transparent',
      ...sx,
    }}
  >
    {children}
  </select>
)

export default Select
