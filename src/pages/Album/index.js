import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { getAlbum } from 'services/Albums';
import DetailsPage from './Details';
import AlbumGenresPage from './Genres';
import CreateReview from './Review/Create';
import RetrieveUpdateReview from './Review/RetrieveUpdate';
import { getAlbumUrl, getAlbumGenresUrl, createReviewUrl, getReviewUrl, getDiscussionsUrlForObject } from 'pages/urls';
import { CreateDiscussionLink } from 'containers/Links';
import AlbumSidebar from 'components/Album/Sidebar';
import TrackList from 'components/Album/TrackList';
import { trackAnalytics } from 'utils/track';
import Head from 'components/Utils/Head';

const ExtendedSidebar = ({album}) => (
    <>
      <AlbumSidebar
        {...album}
      />
      <span>
        <Link
          to={getDiscussionsUrlForObject('album', album.id)}
          className="button is-medium has-margin-top-5 is-fullwidth is-info">Discussions</Link>

        <CreateDiscussionLink
          className="button is-medium has-margin-top-5 is-fullwidth is-success"
          title="New discussion"
          contentType="album"
          objectId={album.id}
        />

      </span>
      <hr/>
      <h3 className="is-size-5">Tracks</h3>
      <TrackList
        tracks={album.mbid ? album.tracks.track_list : []}
      />
    </>
);


const AlbumDetails = (props) => {

    const [album, setAlbum] = useState(null);

    useEffect(() => {
        trackAnalytics();
        getAlbum(props.match.params.mbid).then(
            (response) => {
                setAlbum(response.data);
            }
        );
    }, [props.match.params.mbid]);


    return album ? (
        <div className="columns is-multiline is-marginless is-paddingless">
          <Head
            title={album.title}
            description={`${album.title} ${album.artists && "by " + album.artists[0].name}`}
            image={album.media_cover}
            url={window.location.href + getAlbumUrl(album.mbid)}
          />
          <div className="column is-12-mobile is-3-desktop">
            <ExtendedSidebar album={album}/>
          </div>
          <div className="column is-12-mobile is-9-desktop has-padding-left-30">
            <Route
              exact
              path={props.match.url}
              render={(props) => <DetailsPage {...props}
                                          album={album}
                                          />}
            />
            <Route exact
                   path={getAlbumGenresUrl(album.mbid)}
                   render={(props) => <AlbumGenresPage {...props}
                    album={album}/>
                          }
            />
            <Route exact
                   path={createReviewUrl(album.mbid)}
                   render={(props) => <CreateReview {...props}
                                                        album={album}
                                               />}
            />
            <Route exact
                   path={getReviewUrl(album.mbid, ":reviewId")}
                   render={(props) => <RetrieveUpdateReview {...props}
                         album={album}
/>}

            />
          </div>
        </div>
    ) : (<div></div>);
}

export default AlbumDetails;
