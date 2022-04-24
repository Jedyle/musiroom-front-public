import React from 'react';
import { Link } from 'react-router-dom';
import { getArtistUrl } from 'pages/urls';

const SimilarArtistsPanel = ({
    artists
}) => (
      <div className="columns is-multiline is-mobile is-marginless">
        {artists.map((artist, index) => (
            <div className="column is-4-mobile is-2-tablet"
                 key={index}
            >
              <Link to={getArtistUrl(artist.mbid)}>
                <figure key={artist.mbid} className="image is-square">
                  <img alt={artist.name} src={artist.image}/>
                </figure>
                <h1 className="title is-size-6 has-margin-top-5 has-text-centered">{artist.name}</h1>
              </Link>
            </div>
        ))}
      </div>
);

export default SimilarArtistsPanel;
