import React from 'react';
import { Link } from 'react-router-dom';

import { getAlbumUrl } from 'pages/urls';

const Gallery = ({albums}) => (
    <div className="container is-fluid">
      <div className="columns is-multiline is-mobile is-marginless">
        {albums.map((album, index) => (
            <div className="column is-6-mobile is-4-tablet is-2-desktop"
                 key={index}
            >

              <Link to={getAlbumUrl(album.mbid)}>
                <figure key={album.cover} className="image is-square">
                  <img alt={album.title} src={album.cover} title={album.title}/>
                </figure>
              </Link>
            </div>
        ))}
      </div>
    </div>
);

export default Gallery;
