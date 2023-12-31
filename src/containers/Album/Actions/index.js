import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddToListButton from 'containers/Album/Actions/AddToList';
import AddToInterests from 'containers/Album/Actions/AddToInterests';
import AddToCollection from 'containers/Album/Actions/AddToCollection';
import RateAlbum from 'containers/Album/Actions/RateAlbum';
import { createReviewUrl, getReviewUrl } from 'pages/urls';

import { getUser } from 'services/Auth/api';
import { getUserRating, changeInterest, changeRating, deleteRating, changeCollection } from 'services/OwnRatings';

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
            if (error.response.status === 404){
                this.setState({
                    userRating: null
                });
            }
        });
    }

    onChangeRating = (newRating) => {
        if (!this.state.userRating || newRating !== this.state.userRating.score){
            changeRating(this.props.rating, this.state.userRating, newRating, (response) => {
                this.setState({userRating: response.data});
            });
        }
    }

    onDeleteRating = () => {
        deleteRating(this.props.rating, this.state.userRating, (response) => {this.setState({userRating: response.data});});
    }

    onChangeInterest = () => {
        changeInterest(this.props.rating, this.state.userRating, (response) => {
            if (response.status === 200 || response.status === 201){
                this.setState({userRating: response.data});
            }
            else if (response.status === 204){
                this.setState({userRating: null});
            }
        });
    }

    onChangeCollection = () => {
        changeCollection(this.props.rating, this.state.userRating, (response) => {
            if (response.status === 200 || response.status === 201){
                this.setState({userRating: response.data});
            }
            else if (response.status === 204){
                this.setState({userRating: null});
            }
        });
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
                >
                  <i className="fa fa-list" style={{marginRight: "7px"}}></i> {"  "}
                  Add to list
                </AddToListButton>
                <AddToInterests
                  onChangeInterest={this.onChangeInterest}
                  interest={userRating ? userRating.is_interested : false}
                  contentWhenInterest={
                      <>
                        <i className="fa fa-map-marker" style={{marginRight: "7px"}}></i> {" "} I want to listen
                      </>
                  }
                  contentWhenNoInterest={
                      <>
                        <i className="fa fa-map-marker" style={{marginRight: "7px"}}></i> {" "} Listen later
                      </>
                  }
                />
                <AddToCollection
                  onChangeCollection={this.onChangeCollection}
                  inCollection={userRating ? userRating.is_in_collection : false}
                  contentInCollection={
                      <>
                        <i className="fa fa-headphones" style={{marginRight: "7px"}}></i> {" "} In my collection
                      </>
                  }
                  contentNotInCollection={
                      <>
                        <i className="fa fa-headphones" style={{marginRight: "7px"}}></i> {" "} Add to my collection
                      </>
                  }
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
                        <Link className="button ml-1 mb-1" to={createReviewUrl(mbid)}>
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
