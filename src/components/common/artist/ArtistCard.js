import React from 'react';

const ArtistCard = ({ artist }) => (
    <div className="card text-center">
        <img className="card-img-top" src={artist.imageUrl} />
        <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted text-truncate">{artist.name}</h6>
        </div>
    </div>
);

export default ArtistCard;
