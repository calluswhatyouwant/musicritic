/* @flow */

import axios from 'axios';

export const trackApi = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
  headers: {
      Authorization: localStorage.getItem('authToken')
  }
});

export const postTrackRating = (
  trackID: string,
  rating: number
  ) => {
  trackApi.post(`track/${trackID}/reviews`, { rating })
  .then(result => result.data)
  .catch((error) => {
      throw error.response.data
  })
}