import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'

export type Page<P = Record<never, never>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}
