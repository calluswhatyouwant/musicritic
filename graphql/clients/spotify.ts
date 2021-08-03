import axios from 'axios'
import QueryString from 'qs'
import * as spotify from 'spotify-web-sdk'

export const getCurrentUser = async (token: string) => {
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return {
    displayName: response.data.display_name,
    email: response.data.email,
    emailVerified: false,
    photoURL: response.data.images[0]?.url,
    uid: response.data.uri,
  }
}

export const getApplicationToken = () => {
  const tokenToEncrypt = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`

  return `Basic ${Buffer.from(tokenToEncrypt).toString('base64')}`
}

spotify.init({
  token: 'token',
  refreshTokenFunction: async () => {
    const { data } = await axios.post(
      'https://accounts.spotify.com/api/token',
      QueryString.stringify({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: getApplicationToken(),
        },
      }
    )

    return data.access_token
  },
})

export default spotify
