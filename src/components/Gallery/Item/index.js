import React from 'react';
import { Link } from 'react-router-dom';

import { getAlbumUrl } from 'pages/urls';
import { truncate } from 'utils/strings'


const GalleryItem = ({album, index, showIndex}) => (
    // className is important to locate element with selenium !!
    <Link className="gallery-item" to={getAlbumUrl(album.mbid)}>
      <figure key={album.media_cover} className="image is-square">
        <img alt={album.title} src={album.media_cover} title={album.title}/>
      </figure>
      <h2 className="title has-text-centered is-size-6 mb-0 mt-1">
        {showIndex && `${index + 1}. `}
        {truncate(
            album.artists.map(
                (artist) => (artist.name)
            ).reduce((prev, curr) => [prev, ', ', curr]),
            40
        )
        }
      </h2>
      <h2 className="title has-text-centered is-size-7 mb-0">
        {truncate(album.title, 40)}</h2>
    </Link>
);

export default GalleryItem;
