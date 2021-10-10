import axios from 'axios'
import QueryString from 'qs'
import * as spotify from 'spotify-web-sdk'

const applicationToken = `Basic ${Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString('base64')}`

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
          Authorization: applicationToken,
        },
      }
    )

    return data.access_token
  },
})

export default spotify
