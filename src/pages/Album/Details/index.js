import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import RatingActions from 'containers/Album/Actions';
import ReviewsPanel from 'containers/Reviews/Panel';
import AllRatingsStats from 'components/Album/Stats/AllRatings';
import FolloweesRatingsStats from 'components/Album/Stats/FolloweesRatings';
import AlbumLinks from 'components/Album/Links';
import AlbumsFromSameArtist from 'containers/Album/AlbumsFromSameArtist';
import { getAlbumGenresUrl } from 'pages/urls';
import { getUser } from 'services/Auth/api';
import { getAlbumLinks } from 'services/Albums';


const PleaseSubmitGenreMessage = ({
    album
}) => (
    <article className="message is-info">
      <div className="message-header">
        <p>What is the genre of this album ?</p>
      </div>
      <div className="message-body">
        This album is not assigned to any genre yet.
        Please <Link to={getAlbumGenresUrl(album.mbid)}>propose one</Link> !
      </div>
    </article>
);


const DetailsPage = ({album}) => {

    const [links, setLinks] = useState({});

    useEffect(() => {
        getAlbumLinks(album.mbid).then((response) => {
            setLinks(response.data);
        });
    }, [album.mbid]);

    const linksRef = useRef(null);

    const scrollToLink = () => linksRef.current.scrollIntoView({behavior: 'smooth'});

    return (
        <div className="columns is-multiline">
          <div className="column is-12-mobile is-8-desktop">
            <h1 className="title is-size-4">{album.title}</h1>
            <RatingActions
              rating={album.rating.id}
              mbid={album.mbid}
              starDimension="29px"
              starSpacing="3px"
            />
            <button className="button is-normal is-hidden-desktop"
                    onClick={scrollToLink}
            >
        <i className="fa fa-play" style={{marginRight: '7px'}}/>
              Listen now !</button>
          </div>
          <div className="column is-12-mobile is-4-desktop is-3-widescreen is-offset-1-widescreen has-margin-top-20">
            <AllRatingsStats
              album={album}
            />
          </div>
          <div className="column is-12-mobile is-8-desktop is-9-widescreen">
            <hr/>
            {
                album.genres.length === 0 ?
                    <PleaseSubmitGenreMessage album={album}/> : ""
            }
            <br/>
            <ReviewsPanel
              album={album}
            />
          </div>
          <div className="column is-12-mobile is-4-desktop is-3-widescreen">
            { getUser() && (
                <>
                  <br/>
                  <FolloweesRatingsStats
                    album={album}
                  />
                </>
            )}
            <br/>
            <div className="columns is-mobile has-margin-right-10 is-multiline">
              <div className="column is-12">
                <h5 ref={linksRef} className="title has-text-centered is-size-5 mb-1">Listen</h5>
                <AlbumLinks
                  {...links}
                />
                <br/>
                <AlbumsFromSameArtist
                  album={album}
                />
              </div>
            </div>

          </div>
        </div>
    );
};

export default DetailsPage;
