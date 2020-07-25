import React from 'react';
import { Link } from 'react-router-dom';
import { getArtistUrl, getGenreUrl } from 'pages/urls';


const ArtistSidebar = ({
    mbid,
    photo,
    name,
    associated_genres=[]
}) => (
    <div className="card profile-sidebar">
      <div className="card-image">
        <figure className="image is-square">
          <img
            src={photo}
            alt={name}
          />
        </figure>
      </div>
      <div className="card-content is-paddingless">
        <div className="content">
          <div className="list">
            <li className="list-item">
              <h4 className="title is-size-4 has-margin-bottom-10 has-margin-top-5">
                <Link to={getArtistUrl(mbid)}>{name}</Link>
              </h4>
              <p>
                Genres : {associated_genres.length > 0 ?
                    associated_genres.map(
                        (genre) => (<Link key={genre.slug}
                                       to={getGenreUrl(genre.slug)}>
                                       {genre.name}
                                     </Link>)
                    ).reduce((prev, curr) => [prev, ', ', curr]) : "Non précisé"
                }
              </p>             
            </li>
          </div>
        </div>
      </div>      
    </div>
);

export default ArtistSidebar;
