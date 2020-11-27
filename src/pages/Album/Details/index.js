import React from 'react';
import RatingActions from 'components/Album/Actions';
import ReviewsPanel from 'components/Reviews/Panel';
import AllRatingsStats from 'components/Album/Stats/AllRatings';
import FolloweesRatingsStats from 'components/Album/Stats/FolloweesRatings';
import AlbumYoutubeLink from 'components/Album/YoutubeLink';
import AlbumsFromSameArtist from 'components/Album/AlbumsFromSameArtist';
import { getUser } from 'services/Auth/api';

const PleaseSubmitGenreMessage = ({
    album
}) => (
    <article className="message is-info">
      <div className="message-header">
        <p>Quel est le genre de cet album ?</p>
      </div>
      <div className="message-body">
        Cet album n'a pas encore de genre(s) attitré(s). Prenez 5 secondes pour
        {"  "}
        <a>proposer un genre</a>
        {"  "}
        pour cette oeuvre ! 
      </div>
    </article>
);


const DetailsPage = ({album}) => (
    <div className="columns is-multiline">
      <div className="column is-12-mobile is-8-desktop">
        <h1 className="title is-size-2">{album.title}</h1>
        <RatingActions
          rating={album.rating.id}
          mbid={album.mbid}
          starDimension="30px"
          starSpacing="4px"
        />
      </div>
      <div className="column is-6-mobile is-4-desktop is-3-widescreen is-offset-1-widescreen has-margin-top-20">
        <AllRatingsStats
          album={album}
        />
      </div>
      <div className="column is-12-mobile is-9-desktop">
        <hr/>
        {
            album.genres.length === 0 ?
                <PleaseSubmitGenreMessage/> : ""
        }
        <br/>
        <ReviewsPanel
          album={album}
        />
      </div>
      <div className="column is-3">
        { getUser() && (
            <>
              <br/>
              <FolloweesRatingsStats
                album={album}
              />
            </>  
        )}
        <br/>
        <div className="columns is-mobile has-margin-right-10">
          <AlbumYoutubeLink
            mbid={album.mbid}
          />
        </div>
        <br/>
        <AlbumsFromSameArtist
          album={album}
        />

      </div>
    </div>
);

export default DetailsPage;
