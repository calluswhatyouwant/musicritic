/* @flow */

import React from 'react';
import { Album } from 'spotify-web-sdk';

import './AlbumData.css';
import Rating from '../../common/rating/Rating';

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

const AlbumRatings = ({ averageRating, userRating }: AlbumRatingsProps) => (
    <div className="album-ratings row">
        <AlbumRating
            rating={averageRating}
            title="Average rating"
            displayOnly
        />
        <AlbumRating
            rating={userRating}
            title="Your rating"
        />
    </div>
);

type AlbumRatingProps = {
    rating: number,
    title: string,
    displayOnly?: boolean,
};

const AlbumRating = ({ rating, title, displayOnly }: AlbumRatingProps) => (
    <div className="album-rating col-4">
        <p className="album-rating__title">
            {title}
        </p>
        <Rating initialValue={rating} displayOnly={displayOnly} />
    </div>
);

AlbumRating.defaultProps = {
    displayOnly: false,
}

export default AlbumData;
