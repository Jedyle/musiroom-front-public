import React, { Component } from 'react';
import { getRatings } from 'services/Profile';
import AlbumItem from 'components/AlbumList/AlbumItem';
import { Link } from 'react-router-dom';
import { profileUrl } from 'pages/urls';
import { getUser } from 'services/Auth/api';
import { getSelfRatings, getFolloweesAverage } from 'services/Ratings';
import { getReviewsForUserRatings } from 'services/Reviews';

class RatingsTab extends Component {

    constructor(props){
        super(props);
        this.state = {
            album_title_query: "",
            ratings: [],
            userReviews: {},
            loggedUserRatings: {},
            averageFolloweesRatings: {},
            currentPage: 1,
            previousPageUrl: null,
            nextPageUrl: null,
            ordering: '-modified'
        };
        this.onPressEnter = this.onPressEnter.bind(this);
    }

    onPressEnter(event){
        if(event.keyCode === 13){
            this.setState({
                currentPage: 1,
                album_title_query: event.target.value 
            });
        }
    }

    fetchRatings(){
        getRatings({
            username: this.props.profile.user,
            page: this.state.currentPage,
            album_title: this.state.album_title_query,
            ordering: this.state.ordering            
        }).then(
                       (response) => {
                           console.log(response);
                           this.setState({
                               ratings: response.data.results,
                               previousPageUrl: response.data.previous,
                               nextPageUrl: response.data.next
                           });
                           this.fetchReviews();
                           this.fetchDataForLoggedUser();
                       }   
                   );                   
    }

    fetchReviews(){
        let ratings_ids = this.state.ratings.map(
            (rating) => rating.rating
        );
        getReviewsForUserRatings(this.props.profile.user, ratings_ids).then(
            (response) => {
                console.log("reviews", response.data.results);
                let reviewsAsList = response.data.results;
                let userReviews = {};
                for (var i=0; i< reviewsAsList.length; i++){
                    userReviews[reviewsAsList[i].rating.toString()] = reviewsAsList[i];
                }
                this.setState({
                    userReviews: userReviews
                });
            }
        );
    }

    fetchDataForLoggedUser(){
        this.fetchLoggedUserRatings();
        this.fetchFolloweesAvg();
    }

    fetchLoggedUserRatings(){
        let loggedUser = getUser();
        if (loggedUser){
            let ratings_ids = this.state.ratings.map(
                (rating) => rating.rating
            );
            getSelfRatings(ratings_ids).then(
                (response) => {
                    this.setState({
                        loggedUserRatings: response.data.ratings
                    });
                }
            );
        }
    }

    fetchFolloweesAvg(){
        let loggedUser = getUser();
        if (loggedUser){
            let ratings_ids = this.state.ratings.map(
                (rating) => rating.rating
            );
            getFolloweesAverage(ratings_ids).then(
                (response) => {
                    this.setState({
                        averageFolloweesRatings: response.data.ratings
                    });
                }
            );
        }
    }
    
    componentDidMount(){
        if (this.props.profile){
            this.fetchRatings();
        }
    }

    componentDidUpdate(prevProps, prevState){
        if ((this.props.profile !== prevProps.profile) || (
            this.state.currentPage !== prevState.currentPage ||
                this.state.album_title_query !== prevState.album_title_query
        )){
            this.fetchRatings();
        }
    }

    previousPage(){
        this.setState({
            currentPage: this.state.currentPage - 1 
        });
    }
    
    nextPage(){
        this.setState({
            currentPage: this.state.currentPage + 1 
        });
    }

    getLoggedUserRatingFor(rating_id){
        let defaultRating = getUser() ? "-" : null;
        return this.state.loggedUserRatings[rating_id.toString()] || defaultRating;
    }

    getAverageFolloweesRatingsFor(rating_id){       
        let avgRating = this.state.averageFolloweesRatings[rating_id.toString()];
        if (avgRating){
            return avgRating.toFixed(1);
        }
        return getUser() ? "-" : null;
    }
    
    formatRatings(){
        return this.state.ratings.map(
            (rating) => (
                <AlbumItem
                  key={rating.id}
                  cover={rating.content_object.cover}
                  title={
                      (<Link to="/">
                         {rating.content_object.title}
                       </Link>)
                  }
                  user_rating={this.getLoggedUserRatingFor(rating.rating)}
                  followees_rating={this.getAverageFolloweesRatingsFor(rating.rating)}
                  avg_rating={parseFloat(rating.content_object.rating.average).toFixed(1)}
                  description={
                      (<span>
                         Album de {rating.content_object.artists.map(
                             (artist) => (
                                 <Link to="/">
                                   {artist.name}
                                 </Link>
                             )
                         ).reduce(
                             (prev, curr) => [prev, ',', curr]
                         )}
                       </span>)
                  }
                  content={
                      (<span>
                         <span className="tag is-medium is-profile-rating">{rating.score}</span>
                         {<Link className="has-margin-left-10" to={profileUrl(this.props.profile.user)}>{this.props.profile.user}</Link>}
                         {"  "}
                         { this.state.userReviews[rating.rating] ?
                           (<Link to="/">
                               (voir sa critique)
                            </Link>) : ""
                         }
                       </span>)
                  }
                />)
        );
    }
    
    render(){
        return (
            <div className="columns is-multiline">
              <div className="column is-12">
                <hr/>
                <h4 className="title is-4 has-text-centered">Notes</h4>
                <hr/>
                <a
                  className="pagination-previous"
                  disabled={!this.state.previousPageUrl}
                  onClick={() => this.previousPage()}
                > {"<"} </a>
                <a
                  className="pagination-next"
                  disabled={!this.state.nextPageUrl}
                  onClick={() => this.nextPage()}
                >{">"}</a>
                <input
                  className="input has-margin-top-10"
                  type="text"
                  placeholder="Titre..."
                  onKeyDown={this.onPressEnter}
                />
              </div>
              <div className="column is-12-mobile is-10-widescreen">
                {this.formatRatings()}
              </div>
            </div>
        );
    }
}

export default RatingsTab;
