import { AuthenticationError } from 'apollo-server-micro'

import type { Context } from '../context'

export const protectedResolver =
  <Parent, Args>(
    resolver: (parent: Parent, args: Args, ctx: Context) => unknown
  ) =>
  (parent: Parent, args: Args, ctx: Context) => {
    if (!ctx.auth?.user) {
      throw new AuthenticationError(
        'You need to sign in before making this request'
      )
    }

    return resolver(parent, args, ctx)
  }
