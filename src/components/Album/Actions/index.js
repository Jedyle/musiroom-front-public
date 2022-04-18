import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddToListButton from 'components/Album/Actions/AddToList';
import AddToInterests from 'components/Album/Actions/AddToInterests';
import RateAlbum from 'components/Album/Actions/RateAlbum';
import { createReviewUrl, getReviewUrl } from 'pages/urls';

import { getOwnRating, changeOwnRating, createOwnRating, deleteOwnRating } from 'services/OwnRatings';

class RatingActions extends Component {

    constructor(props){
        super(props);
        this.state = {
            userRatingObj: null  
        };
    }

    userRating = () => this.state.userRatingObj && this.state.userRatingObj.score;
    userHasReview = () => this.state.userRatingObj && this.state.userRatingObj.review

    componentDidMount(){
        this.fetchRating();
    }

    fetchRating = () => {
        getOwnRating(this.props.rating).then((response) => {
            this.setState({
                userRatingObj: response.data
            });
        });
    }

    changeRating = (newRating) => {
        let call = this.userRating() ? changeOwnRating : createOwnRating;
        call(this.props.rating, newRating).then((response) => {
            this.setState({
                userRatingObj: response.data
            });
        });
    }

    deleteRating = () => {
        let doDelete = true;
        if (this.userHasReview()){
            doDelete = window.confirm("This will also delete your review ! Proceed ?");
        }
        if (doDelete){
            deleteOwnRating(this.props.rating).then((response) => {
                this.setState({
                    userRatingObj: null
                });
            });
            window.location.reload();
        }
    }

    
    render(){
        let { mbid, starDimension, starSpacing } = this.props;
        let { userRatingObj } = this.state;
        return (
            <>
              <RateAlbum
                starDimension={starDimension}
                starSpacing={starSpacing}
                userRating={userRatingObj ? userRatingObj.score : 0}
                changeRating={this.changeRating}
                deleteRating={this.deleteRating}                
              />
              <br/>
              <br/>
              <div>
                <AddToListButton
                  mbid={mbid}
                >Add to List</AddToListButton>
                <AddToInterests
                  mbid={mbid}
                />
                { userRatingObj && (
                    this.userHasReview() ?
                        (
                            <Link className="button ml-1 is-success" to={getReviewUrl(mbid, userRatingObj.review.id)}>
                              My review
                            </Link>)
                    :
                    (
                        <Link className="button ml-1" to={createReviewUrl(mbid)}>
                          Write a review
                        </Link>
                    )
                )}
              </div>
            </>
        );
    }
}

export default RatingActions;
