import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from 'services/Auth/api';
import { getRegistrationUrl } from 'pages/urls';
import Gallery from 'components/Gallery';
import HeadLine from 'components/Utils/HeadLine';
import Title from 'components/Utils/Title';
import Head from 'components/Utils/Head';

import { getLatestAlbums } from 'services/Albums';
import { trackAnalytics } from 'utils/track';
import RatingStream from 'containers/Activity/Streams/Rating';
import ReviewStream from 'containers/Activity/Streams/Review';
import CommentStream from 'containers/Activity/Streams/Comment';

const Home = () => {

    const [albums, changeAlbums] = useState([]);

    useEffect(() => {
        trackAnalytics();
        getLatestAlbums().then((response) => {
            changeAlbums(response.data);
        });
    }, []);

    return (
        <div className="columns is-mobile is-multiline">
	    <Head
	      title="MusiRoom"
	      overrideTitle={true}
              description="Your musical library"
              image={process.env.REACT_APP_FRONTEND_URL + "/logo_crop_black.png"}
              url={window.location.href}
	    />
          <div className="column is-12">
            {
                getUser() ?
                <HeadLine
                  title={`Welcome Home, ${getUser()} !`}
                  subtitle="Discover the latest albums below."
                /> :
                <HeadLine
		  title="Discover, collect and rate the music you love."
		  subtitle={
                      <Link className="button has-background-sanguine has-text-white mt-2" to={getRegistrationUrl()}>Start now</Link>
                  }
		/>
            }
            </div>
            <Gallery albums={albums}/>
          <hr/>
          { getUser() &&
            <div className="container is-fluid">
	      <div className="columns is-mobile is-multiline is-marginless">
		<div className="column is-12-mobile is-one-third-tablet has-background-light has-margin-right-1">
		  <p className="title is-size-4 has-text-centered">
		    <span className="icon"><i className="fa fa-star"></i></span>
		    {"  "} Ratings {"  "}
		    <span className="icon"><i className="fa fa-star"></i></span>
		  </p>
		  <hr style={{backgroundColor: 'black'}}/>
		  <RatingStream/>
		</div>
		<div className="column is-12-mobile is-one-third-tablet has-background-grey-lighter">
		  <p className="title is-size-4 has-text-centered">
		    <span className="icon"><i className="fa fa-music"></i></span>
		    {"  "} Reviews {"  "}
		    <span className="icon"><i className="fa fa-music"></i></span>
		  </p>
		  <hr style={{backgroundColor: 'black'}}/>
		  <ReviewStream/>
		</div>
		<div className="column is-12-mobile is-one-third-tablet has-background-light">
		  <p className="title is-size-4 has-text-centered">
		    <span className="icon"><i className="fa fa-comment"></i></span>
		    {"  "} Comments {"  "}
		    <span className="icon"><i className="fa fa-comment"></i></span>
		  </p>
		  <hr style={{backgroundColor: 'black'}}/>
		  <CommentStream/>
		</div>
	      </div>
            </div>
          }
        </div>
    );
};


export default Home;
