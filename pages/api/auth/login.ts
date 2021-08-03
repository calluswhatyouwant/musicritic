import type { NextApiRequest, NextApiResponse } from 'next'
import type { CookieSerializeOptions } from 'cookie'
import { serialize } from 'cookie'
import QueryString from 'qs'

export const STATE_KEY = 'spotify-auth-state'

export const setCookie =
  (name: string, value: unknown, options: CookieSerializeOptions = {}) =>
  (res: NextApiResponse) => {
    const stringValue =
      typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value)

    if (options.maxAge !== undefined) {
      options.expires = new Date(Date.now() + +options.maxAge)
      options.maxAge /= 1000
    }

    res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
  }

const generateRandomState = (length: number) => {
  let state = ''
  const letters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i += 1) {
    state += letters.charAt(Math.floor(Math.random() * letters.length))
  }

  return state
}

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const state = generateRandomState(16)

  setCookie(STATE_KEY, state)(res)
  res.redirect(
    `https://accounts.spotify.com/authorize?${QueryString.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: `user-read-email
              user-read-private
              user-read-currently-playing
              user-read-recently-played
              user-top-read`,
      redirect_uri: `${
        process.env.SERVER_BASE_URI ?? 'http://localhost:3000'
      }/api/auth/callback`,
      state,
    })}`
  )
}
