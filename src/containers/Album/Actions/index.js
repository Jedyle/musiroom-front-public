import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddToListButton from 'containers/Album/Actions/AddToList';
import AddToInterests from 'containers/Album/Actions/AddToInterests';
import RateAlbum from 'containers/Album/Actions/RateAlbum';
import { createReviewUrl, getReviewUrl } from 'pages/urls';

import { getUser } from 'services/Auth/api';
import { getUserRating, changeInterest, changeRating, deleteRating } from 'services/OwnRatings';

class RatingActions extends Component {

    constructor(props){
        super(props);
        this.state = {
            userRating: null  
        };
    }

    componentDidMount(){
        if (getUser()){
            this.fetchRating();   
        }
    }

    fetchRating = () => {
        getUserRating(this.props.rating).then((response) => {
            this.setState({
                userRating: response.data
            });
        }).catch(error => {
            console.log("lol", error);
            if (error.response.status === 404){
                this.setState({
                    userRating: null
                })
            }
        });
    }

    onChangeRating = (newRating) => {
        changeRating(this.props.rating, this.state.userRating, newRating, (response) => {this.setState({userRating: response.data})})
    }

    onDeleteRating = () => {
        let doDelete = true;
        if (this.state.userRating.review){
            doDelete = window.confirm("This will also delete your review ! Proceed ?");
        }
        if (doDelete){
            deleteRating(this.props.rating, this.state.userRating, (response) => {this.setState({userRating: response.data})});
        }
    }

    onChangeInterest = () => {
        changeInterest(this.props.rating, this.state.userRating, (response) => {this.setState({userRating: response.data})});    
    }

    
    render(){
        let { mbid, starDimension, starSpacing } = this.props;
        let { userRating } = this.state;
        return (
            <>
              <RateAlbum
                starDimension={starDimension}
                starSpacing={starSpacing}
                userRating={userRating && userRating.score ? userRating.score : 0}
                changeRating={this.onChangeRating}
                deleteRating={this.onDeleteRating}                
              />
              <br/>
              <br/>
              <div>
                <AddToListButton
                  mbid={mbid}
                >Add to List</AddToListButton>
                <AddToInterests
                  onChangeInterest={this.onChangeInterest}
                  interest={userRating ? userRating.is_interested : false}
                />
                { userRating && (
                    userRating.review ?
                        (
                            <Link className="button ml-1 is-success" to={getReviewUrl(mbid, userRating.review.id)}>
                              My review
                            </Link>)
                    :
                    (
                        userRating.score &&
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
