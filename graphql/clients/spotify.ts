import axios from 'axios'
import QueryString from 'qs'
import * as spotify from 'spotify-web-sdk'

const spotifyAuthorization = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
const buff = Buffer.from(spotifyAuthorization)

const spotifyAuthToken = buff.toString('base64')

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
          Authorization: `Basic ${spotifyAuthToken}`,
        },
      }
    )

    return data.access_token
  },
})

export default spotify
