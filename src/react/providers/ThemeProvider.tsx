import type { FC, ReactNode } from 'react'
import { ThemeProvider } from 'theme-ui'

import { theme } from './theme'

interface Props {
  children?: ReactNode
}

const Provider: FC<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Provider
