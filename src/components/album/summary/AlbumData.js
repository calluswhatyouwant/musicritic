/* @flow */

import React from 'react';
import { Album } from 'spotify-web-sdk';

import './AlbumData.css';

type Props = {
    album: Album,
    averageRating: number,
    userRating: number,
};

const AlbumData = ({ album, averageRating, userRating }: Props) => (
    <div className="album-data">
        <img
          alt={album.name}
          className="album-data__cover shadow-lg"
          src={album.imageUrl}
        />
        <div className="album-data__text">
            <h1>{album.name}</h1>
            <h4>by {album.stringArtists}</h4>
            <p>{album.releaseYear}</p>
        </div>
        <AlbumRatings
          averageRating={averageRating}
          userRating={userRating}
        />
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
        <div className="album-ratings row">
            <AlbumRating
              rating={averageRating}
              ratingEval={ratingEval}
              title="Average rating"
            />
            <AlbumRating
              rating={userRating}
              ratingEval={ratingEval}
              title="Your rating"
            />
        </div>
    );
};

type AlbumRatingProps = {
    rating: number,
    ratingEval: (number) => string,
    title: string,
};

const AlbumRating = ({ rating, ratingEval, title }: AlbumRatingProps) => (
    <div className={`album-rating album-rating--${ratingEval(rating)} col-4`}>
        <p className="album-rating__title">
            {title}
        </p>
        <h3 className="album-rating__value">
            {rating}
        </h3>
    </div>
);

export default AlbumData;
