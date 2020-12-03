/* @flow */
import express from 'express';
import { spotifySdk } from '../spotify/util';

import { objectToJson } from '../util';

const router = express.Router();

router.get('/search/:q', async (req, res) => {
  const query = req.params.q;

  const searchResults = await spotifySdk.search(query, 'album,artist,playlist,track', { limit: 50 });

  res.status(200).send(searchResults);
});

export default router;
