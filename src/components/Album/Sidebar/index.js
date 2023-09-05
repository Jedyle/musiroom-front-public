import React from 'react';
import { formatDate } from 'utils/date';
import { Link } from 'react-router-dom';
import { getAlbumUrl, getArtistUrl, getGenreUrl, getAlbumGenresUrl } from 'pages/urls';

const AlbumSidebar = ({
    mbid,
    media_cover,
    title,
    artists=[],
    release_date,
    album_type,
    real_genres
}) => (
    <div className="card profile-sidebar">
      <div className="card-image">
        <figure className="image is-square">
          <img
            src={media_cover}
            alt={title}
          />
        </figure>
      </div>
      <div className="card-content is-paddingless">
        <div className="content">
          <div className="list">
            <li className="list-item">
              <p className="title is-size-4 has-margin-bottom-10">
                <Link to={getAlbumUrl(mbid)}>{title}</Link>
              </p>
              <p>
                {   artists.length >= 1 &&
                    artists.map(
                        (artist) => (
                            <Link key={artist.mbid}
                                  to={getArtistUrl(artist.mbid)}>
                              {artist.name}
                            </Link>)
                    ).reduce((prev, curr) => [prev, ', ', curr])
                }
              </p>
            </li>
            {release_date &&
             <li className="list-item">
               Release date : {formatDate(release_date)}
             </li>
            }
            {album_type &&
             <li className="list-item">
               Type : {album_type}
             </li>
            }
            {real_genres &&
             <li className="list-item">
               Genres : {real_genres.length > 0 ?
                         real_genres.map(
                             (genre) => (<Link key={genre.slug}
                              to={getGenreUrl(genre.slug)}>
                           {genre.name}
                         </Link>)
                         ).reduce((prev, curr) => [prev, ', ', curr]) : "Unknown"
                        } {"  "}

               ({<Link to={getAlbumGenresUrl(mbid)}>vote on genres</Link>})

             </li>
            }
          </div>
        </div>
      </div>
    </div>
);

export default AlbumSidebar;
