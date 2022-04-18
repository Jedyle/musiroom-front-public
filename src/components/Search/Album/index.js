import React from 'react';
import { Link } from 'react-router-dom';
import { getAlbumUrl, getArtistUrl } from 'pages/urls';


export default function AlbumSearch({results}) {
    return (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {results.map((album) => (
                <tr>
                  <th><Link to={getAlbumUrl(album.album_mbid)}>{album.title}</Link></th>
                  <th><Link to={getArtistUrl(album.artist_mbid)}>{album.artist}</Link></th>
                  <th>{album.type}</th>
                </tr>
            ))}
          </tbody>
        </table>
    );
}
