import React, { useState, useEffect } from 'react';

import Gallery from 'components/Gallery';
import HeadLine from 'components/Utils/HeadLine';
import Title from 'components/Utils/Title';

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
            changeAlbums(response.data)
        })
    }, []);
    
    return (
        <div className="columns is-mobile is-multiline">
          <Title title="MusiRoom"/>
          <div className="column is-12">
            <HeadLine
              title="MusiRoom, your musical library."
              subtitle="Listen, review, share."
            />
          </div>
          <Gallery albums={albums}/>
          <hr/>
          <div className="container is-fluid">
            <div className="columns is-mobile is-multiline is-marginless">
              <div className="column is-12-mobile is-one-third-tablet has-background-light has-margin-right-1">
                <p className="title is-size-4 has-text-centered">
                  <span className="icon"><i className="fa fa-star"></i></span>
                  {"  "} Last ratings {"  "}
                  <span className="icon"><i className="fa fa-star"></i></span>
                </p>
                <hr style={{backgroundColor: 'black'}}/>
                <RatingStream/>
              </div>
              <div className="column is-12-mobile is-one-third-tablet has-background-grey-lighter">
                <p className="title is-size-4 has-text-centered">
                  <span className="icon"><i className="fa fa-music"></i></span>
                  {"  "} Last reviews {"  "}
                  <span className="icon"><i className="fa fa-music"></i></span>
                </p>
                <hr style={{backgroundColor: 'black'}}/>
                <ReviewStream/>
              </div>
              <div className="column is-12-mobile is-one-third-tablet has-background-light">
                <p className="title is-size-4 has-text-centered">
                  <span className="icon"><i className="fa fa-comment"></i></span>
                  {"  "} Last comments {"  "}
                  <span className="icon"><i className="fa fa-comment"></i></span>
                </p>
                <hr style={{backgroundColor: 'black'}}/>
                <CommentStream/>
              </div>              
            </div>
          </div>
         </div>
    );    
};


export default Home;
