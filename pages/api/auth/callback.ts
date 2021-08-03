import type { NextApiRequest, NextApiResponse } from 'next'
import QueryString from 'qs'
import axios from 'axios'

import { getApplicationToken } from '@/graphql/clients/spotify'
import { loginWithSpotify } from '@/graphql/clients/firebase-admin'

import { setCookie, STATE_KEY } from './login'

const requestForSpotifyUserToken = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  setCookie(STATE_KEY, '', { maxAge: -1 })(res)
  const { code } = req.query

  const error = () =>
    res.redirect(
      `${
        process.env.SERVER_BASE_URI ?? 'http://localhost:3000'
      }/auth/error/${QueryString.stringify({ error: 'invalid_token' })}`
    )

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      QueryString.stringify({
        code,
        redirect_uri: `${
          process.env.SERVER_BASE_URI ?? 'http://localhost:3000'
        }/api/auth/callback`,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          Authorization: getApplicationToken(),
        },
      }
    )

    if (response.status === 200) {
      const firebaseToken = await loginWithSpotify(response.data.access_token)

      res.redirect(
        `${process.env.SERVER_BASE_URI ?? 'http://localhost:3000'}/auth/${
          response.data.access_token
        }/${response.data.refresh_token}/${Buffer.from(firebaseToken).toString(
          'base64'
        )}`
      )
    } else {
      error()
    }
  } catch (err) {
    error()
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { state } = req.query
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null

  if (!state || state !== storedState) {
    res.redirect(
      `${process.env.SERVER_BASE_URI ?? 'http://localhost:3000'}
        ${QueryString.stringify({ error: 'state_mismatch' })}`
    )
  } else {
    await requestForSpotifyUserToken(req, res)
  }
}
