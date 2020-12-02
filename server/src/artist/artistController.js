/* @flow */

import express from 'express';
import { spotifySdk } from '../spotify/util';

import { TRACK } from '../reviews/trackReviewController';
import { ALBUM } from '../reviews/albumReviewController';
import { getReviews } from '../reviews/reviewCollections';

import { objectToJson } from '../util';

const router = express.Router();

router.get('/artists/:id', async (req, res) => {
    const averageRating = contentRatings =>
        contentRatings.length > 0
            ? contentRatings.reduce((x, y) => x + y) / contentRatings.length
            : 0;

    const artistId = req.params.id;

    const artist = await spotifySdk.getArtist(artistId);
    const topTracks = await spotifySdk.getArtistTopTracks(artistId, 'US');
    const albums = (
        await spotifySdk.getArtistAlbums(artistId, {
            includeGroups: ['album'],
        })
    ).items;

    const topTracksReviews = await Promise.all(
        topTracks.map(async track => await getReviews(track.id, TRACK))
    );
    const topTracksRatings = topTracksReviews.map(reviews =>
        reviews.map(review => review.rating)
    );
    const topTracksAverages = topTracksRatings.map(ratings =>
        averageRating(ratings)
    );

    const albumsReviews = await Promise.all(
        albums.map(async album => await getReviews(album.id, ALBUM))
    );
    const albumsRatings = albumsReviews.map(reviews =>
        reviews.map(review => review.rating)
    );
    const albumsAverages = albumsRatings.map(ratings => averageRating(ratings));

    res.status(200).send({
        artist: JSON.parse(objectToJson(artist)),
        topTracks: topTracks.map(t => ({
            ...JSON.parse(objectToJson(t)),
            album: JSON.parse(objectToJson(t.album))
        })),
        albums: albums.map(a => JSON.parse(objectToJson(a))),
        topTracksAverages,
        albumsAverages,
    });
});

export default router;
