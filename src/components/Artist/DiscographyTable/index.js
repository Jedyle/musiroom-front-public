import React from 'react';
import { Link } from 'react-router-dom';
import { getAlbumUrl } from 'pages/urls';
import RatingTags from 'components/StarRatings/Tags';

import './index.css';

const DiscographyTable = ({
    albums
}) => (
    <table className="table is-fullwidth">
      <tbody>
      <tr>
        <th>Année</th>
        <th>Titre</th>
        <th>
          <span className="is-pulled-right">Notes</span>
        </th>
      </tr>
        {
            albums.map(
                (album) => (
                    <tr>
                      <th className="year">{album.year}</th>
                      <th className="album">
                        <Link to={getAlbumUrl(album.mbid)}>
                          {album.title}
                        </Link>
                      </th>
                      <th className="ratings">
                        <RatingTags
                          userRating={album.details && album.details.user_rating}
                          followeesRating={album.details && album.details.followees_avg}
                          avgRating={album.details && album.details.rating.average}
                        />
                      </th>
                    </tr>
                ))        
            }
      </tbody>
    </table>
);

export default DiscographyTable;
