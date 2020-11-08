/* @flow */
import express from 'express';
import { spotifySdk } from '../spotify/util';

const router = express.Router();

router.get('/tracks/:id', async (req, res) => {
    const track = await spotifySdk.getTrack(req.params.id);
    res.status(200).send(track);
});

export default router;
