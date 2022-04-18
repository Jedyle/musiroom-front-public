import React from 'react';
import { Link } from 'react-router-dom';
import { getArtistUrl } from 'pages/urls';


export default function ArtistSearch({results}) {
    return (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {results.map((artist) => (
                <tr>
                  <th><Link to={getArtistUrl(artist.mbid)}>{artist.name}</Link></th>
                </tr>
            ))}
          </tbody>
        </table>
    );
}
