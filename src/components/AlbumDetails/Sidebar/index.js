import React from 'react';
import { formatDate } from 'utils/date';
import { Link } from 'react-router-dom';
import { getAlbumUrl, getArtistUrl, getGenreUrl } from 'pages/urls';

const AlbumSidebar = ({
    mbid,
    cover,
    title,
    artists=[],
    release_date,
    album_type,
    genres
}) => (
    <div className="card profile-sidebar">
      <div className="card-image">
        <figure className="image is-square">
          <img
            src={cover}
            alt={title}
          />
        </figure>
      </div>
      <div className="card-content is-paddingless">
        <div className="content">
          <div className="list">
            <li className="list-item">
              <h4 className="title is-size-4 has-margin-bottom-10">
                <Link to={getAlbumUrl(mbid)}>{title}</Link>
              </h4>
              <p>
                {
                    artists.map(
                        (artist) => (<Link key={artist.mbid}
                                           to={getArtistUrl(artist.mbid)}>
                                       {artist.name}
                                     </Link>)
                    )
                }
              </p>             
            </li>
            {release_date &&
             <li className="list-item">
               Date de parution : {formatDate(release_date)}
             </li>
            }
            {album_type && 
             <li className="list-item">
               Type : {album_type}
             </li>
            }
            {genres &&
             <li className="list-item">
               Genres : {genres.length > 0 ? 
                         genres.map(
                             (genre) => (<Link key={genre.slug}
                              to={getGenreUrl(genre.slug)}>
                           {genre.name}
                         </Link>)
                         ).reduce((prev, curr) => [prev, ', ', curr]) : "Non précisé"
                        } {"  "}
               (voter sur les genres)
             </li>
            }
          </div>
        </div>
      </div>      
    </div>
);

export default AlbumSidebar;
