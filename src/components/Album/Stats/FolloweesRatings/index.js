import React, { Component } from 'react';
import RatingsChart from '../RatingsChart';
import { getFolloweesRatings } from 'services/Ratings';
import { Link } from 'react-router-dom';
import { profileUrl, getReviewUrl } from 'pages/urls';

const FolloweesRatingsList = ({
    ratings,
    album
}) => (
    <ul>
      {ratings.map(
          (rating) => (
              <li key={rating.id}>
                <span className="tag is-success is-light is-medium has-margin-5">
                  {rating.score}
                </span>
                <Link to={profileUrl(rating.user)}>
                  {rating.user}
                </Link>
                {rating.review && <Link to={getReviewUrl(album.mbid, rating.review.id)}>{"      "}<span className="tag is-info has-margin-3">Review</span></Link>}
              </li>
          )
      )}
    </ul>
);

export default class FolloweesRatingsStats extends Component {

    constructor(props){
        super(props);
        this.state = {
            stats: null
        };
    }

    componentDidMount(){
        if(this.props.album.rating){
            getFolloweesRatings(this.props.album.rating.id).then(
                (response) => {
                    this.setState({
                        stats: response.data.stats,
                        ratings: response.data.results
                    });
                }
            );
        }
    }

    render(){
        return (
            <>
              <p className="title has-text-centered is-size-5">My followees</p>
              {this.state.stats ? (
                  <>
                    <RatingsChart
                      stats={this.state.stats}
                      textClass="has-text-success"
                    />
                    <FolloweesRatingsList
                      album={this.props.album}
                      ratings={this.state.ratings}
                    />
                  </>
              ) : (<div className="has-text-centered">Nobody among your followees rated this album</div>)}
            </>
        );
    };

}
