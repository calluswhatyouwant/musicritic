/* @flow */

import React from 'react';
import { Album } from 'spotify-web-sdk';

import './AlbumData.css';
import Rating from '../../common/rating/Rating';

type Props = {
    album: Album,
    averageRating: number,
    userRating: number,
    postRating: (rating: number) => void,
};

const AlbumData = ({ album, averageRating, userRating, postRating }: Props) => (
    <div className="album-data">
        <img
          alt={album.name}
          className="album-data__cover shadow-lg"
          src={album.images[0].url}
        />
        <div className="album-data__text">
            <h1>{album.name}</h1>
            <h4>by <a className="text-light" href={`/artist/${album.artists[0].id}`}>{album.stringArtists}</a></h4>
            <p>{album.releaseYear}</p>
        </div>
        <AlbumRatings
          postRating={postRating}
          averageRating={averageRating}
          userRating={userRating}
        />
    </div>
);

type AlbumRatingsProps = {
    averageRating: number,
    userRating: number,
    postRating: (rating: number) => void,
};

const AlbumRatings = ({ averageRating, userRating, postRating }: AlbumRatingsProps) => (
    <div className="album-ratings row">
        <AlbumRating
            rating={averageRating}
            title="Average rating"
            displayOnly
        />
        {(userRating !== undefined) && (
            <AlbumRating
              rating={userRating}
              title="Your rating"
              postRating={postRating}
            />
        )}
    </div>
);

type AlbumRatingProps = {
    rating: number,
    title: string,
    displayOnly?: boolean,
    postRating?: (rating: number) => void,
};

const AlbumRating = ({ rating, title, displayOnly, postRating }: AlbumRatingProps) => (
    <div className="album-rating col-4">
        <p className="album-rating__title">
            {title}
        </p>
        {(!displayOnly || rating > 0) && (
            <Rating
                initialValue={rating}
                displayOnly={displayOnly}
                onValueChange={postRating}
            />
        )}
        {(displayOnly && rating === 0) && (<i>Not rated yet.</i>)}
    </div>
);

AlbumRating.defaultProps = {
    displayOnly: false,
    postRating: () => {},
}

export default AlbumData;
