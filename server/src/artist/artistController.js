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
            market: 'US',
            includeGroups: ['album'],
        })
    ).items;

    const tracks = (await Promise.all(albums.map(
        async album => (await spotifySdk.getAlbumTracks(album.id)).items
    ))).flat()

    const topTracksReviews = await Promise.all(
        topTracks.map(async track => await getReviews(TRACK, track.id))
    );
    const topTracksRatings = topTracksReviews.map(reviews =>
        reviews.map(review => review.rating)
    );
    const topTracksAverages = topTracksRatings.map(ratings =>
        averageRating(ratings)
    );

    const albumsReviews = await Promise.all(
        albums.map(async album => [album, await getReviews(ALBUM, album.id)])
    );
    const albumsRatings = albumsReviews.map(reviews =>
        [reviews[0], reviews[1].map(review => review.rating)]
    );
    const albumsAverages = albumsRatings.map(ratings => averageRating(ratings[1]));
    const bestRatedAlbums = albumsRatings.map(
        ratings => [ratings[0], averageRating(ratings[1])]
    ).sort((a, b) => b[1] - a[1]).slice(0, 5)

    const tracksReviews = await Promise.all(
        tracks.map(async track => [track, await getReviews(TRACK, track.id)])
    );
    const tracksRatings = tracksReviews.map(reviews =>
        [reviews[0], reviews[1].map(review => review.rating)]
    );
    const tracksAverages = tracksRatings.map(ratings => [ratings[0], averageRating(ratings[1])]);
    const bestRatedTracks = tracksAverages.sort((a, b) => b[1] - a[1]).slice(0, 5)

    res.status(200).send({
        artist: JSON.parse(objectToJson(artist)),
        topTracks: topTracks.map(t => ({
            ...JSON.parse(objectToJson(t)),
            album: JSON.parse(objectToJson(t.album))
        })),
        albums: albums.map(a => JSON.parse(objectToJson(a))),
        topTracksAverages,
        albumsAverages,
        bestRatedTracks,
        bestRatedAlbums,
    });
});

export default router;
