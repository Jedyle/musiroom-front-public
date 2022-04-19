import React, { Component } from 'react';
import { getRatings } from 'services/Profile';
import AlbumList from 'containers/AlbumList';
import { Link } from 'react-router-dom';
import { getReviewsForUserRatings } from 'services/Reviews';
import AbstractListTab from '../AbstractListTab';
import { profileUrl } from 'pages/urls';

class RatingsList extends Component {

    constructor(props){
        super(props);
        this.state = {
            userReviews: {}
        };
    }

    componentDidMount(){
        if (this.props.profile){
            this.fetchReviews();
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (
            (prevProps.profile !== this.props.profile) ||
                (prevProps.results !== this.props.results)
        ){
            this.fetchReviews();
        }
    }
        
    fetchReviews(){
        let userRatingIds = this.props.results.map(
            (userRating) => userRating.id
        );
        getReviewsForUserRatings(this.props.profile.user, userRatingIds).then(
            (response) => {
                let reviewsAsList = response.data.results;
                let userReviews = {};
                for (var i=0; i < reviewsAsList.length; i++){
                    userReviews[reviewsAsList[i].rating.content_object.rating.id] = reviewsAsList[i];
                }                
                this.setState({
                    userReviews: userReviews
                });
            }
        );
    }

    formatContent(){
        let formattedRatings = {};
        for (let userRating of this.props.results){
            formattedRatings[userRating.rating] = (
                (<span>
                   <span className="tag is-medium is-profile-rating">{userRating.score}</span>
                   {<Link className="has-margin-left-10" to={profileUrl(this.props.profile.user)}>{this.props.profile.user}</Link>}
                   {"   "}
                 { this.state.userReviews[userRating.rating] ?
                   (<Link to="/">
                     (read his review)
                    </Link>) : ""}
                </span>)
            );            
        }
        return formattedRatings;
    }

    render(){
        return this.props.results.length > 0 && <AlbumList
                 ratedObjects={this.props.results.map(
                     (rating) => rating.content_object
                 )}
                 content={this.formatContent()}
               />;
    }
}

const RatingsTab = (props) => (
    <AbstractListTab
      header={
          (<span>
             <hr/>
             <h4 className="title is-4 has-text-centered">Ratings</h4>
             <hr/>
           </span>)
      }
      ListComponent={RatingsList}
      fetchElements={getRatings}
      {...props}
    />  
);

export default RatingsTab;
