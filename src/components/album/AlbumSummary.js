/* @flow */

import React from 'react';
import { Album, ArtistSimplified, AlbumSimplified } from 'spotify-web-sdk';

import ArtistAlbumsGrid from './ArtistAlbumsGrid';

type Props = {
    album: Album,
    artistAlbums: AlbumSimplified[],
    mainArtist: ArtistSimplified,
};

const AlbumSummary = ({ album, artistAlbums, mainArtist }: Props) => {
    const style = {
        backgroundImage: `url(${album.imageUrl})`,
    };

    return (
        <div className="col-lg-6">
            <div className="album-header pt-3" style={style}>
                <AlbumData album={album} averageRating={3} userRating={3.5} />
                <AlbumMenu />
            </div>
            <ArtistAlbumsGrid
              artist={mainArtist}
              artistAlbums={artistAlbums}
              currentAlbumId={album.id}
            />
        </div>
    );
};

type AlbumDataProps = {
    album: AlbumSimplified,
    averageRating: number,
    userRating: number,
};

const AlbumData = ({ album, averageRating, userRating }: AlbumDataProps) => (
    <div className="album-content m-1">
        <img
          alt={album.name}
          className="w-75 mx-auto d-block shadow-lg"
          src={album.imageUrl}
        />
        <div className="text-center text-light pt-3">
            <h1>{album.name}</h1>
            <h4>by {album.stringArtists}</h4>
            <p>{album.releaseYear}</p>
            <AlbumRatings
              averageRating={averageRating}
              userRating={userRating}
            />
        </div>
    </div>
);

const AlbumMenu = () => (
    <div className="album-content">
        <button
          type="button"
          className="btn btn-album-play btn-block text-light rounded-0 m-0 p-2"
        >
            PLAY ALBUM
        </button>
        <button
          type="button"
          className="btn btn-album-menu btn-block text-light rounded-0 m-0 p-2"
        >
            ADD TO FAVORITES
        </button>
        <button
          type="button"
          className="btn btn-album-menu btn-block text-light rounded-0 m-0 p-2"
        >
            WRITE A REVIEW
        </button>
    </div>
);

type AlbumRatingsProps = {
    averageRating: number,
    userRating: number,
};

const AlbumRatings = ({ averageRating, userRating }: AlbumRatingsProps) => {
    const ratingEval = (rating: number) => {
        if (rating > 3.0) return 'positive';
        else if (rating >= 2.0) return 'mixed';
        return 'negative';
    };

    return (
        <div className="row justify-content-around mb-3">
            <Rating
              rating={averageRating}
              ratingEval={ratingEval}
              title="Average rating"
            />
            <Rating
              rating={userRating}
              ratingEval={ratingEval}
              title="Your rating"
            />
        </div>
    );
};

type RatingProps = {
    rating: number,
    ratingEval: (number) => string,
    title: string,
};

const Rating = ({ rating, ratingEval, title }: RatingProps) => (
    <div className={`col-4 rating-${ratingEval(rating)} py-2`}>
        <p className="rating-title text-uppercase mb-1">
            {title}
        </p>
        <h3 className="mb-0">
            {rating}
        </h3>
    </div>
);

export default AlbumSummary;
