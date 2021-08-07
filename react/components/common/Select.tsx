/** @jsxImportSource theme-ui */

import type { ChangeEventHandler, FC, OptionHTMLAttributes } from 'react'

interface Props {
  value: number | string
  onChange: ChangeEventHandler<HTMLSelectElement>
  children: Array<OptionHTMLAttributes<HTMLOptionElement>>
}

const Select: FC<Props> = ({ value, onChange, children }) => (
  <select
    value={value}
    onChange={onChange}
    sx={{
      minWidth: '10rem',
      height: 36,
      borderRadius: 4,
      backgroundColor: 'transparent',
    }}
  >
    {children}
  </select>
)

export default Select
