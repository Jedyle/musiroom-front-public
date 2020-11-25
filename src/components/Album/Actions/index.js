import React, { Component } from 'react';
import StarRatings from 'components/StarRatings';
import { getOwnRating, changeOwnRating, createOwnRating, deleteOwnRating } from 'services/OwnRatings';
import AddToListButton from 'components/Album/Actions/AddToList';
import InterestButton from 'components/Album/Actions/AddToInterests';

export default class RatingActions extends Component {

    constructor(props){
        super(props);
        this.state = {
            userRating: 0  
        };
        this.changeRating = this.changeRating.bind(this);
        this.deleteRating = this.deleteRating.bind(this);
    }

    changeRating(newRating){
        let call = this.state.userRating === 0  ? createOwnRating : changeOwnRating;
        call(this.props.rating, newRating).then((response) => {
            this.setState({
                userRating: response.data.score
            });
        });
    }

    deleteRating(){
        deleteOwnRating(this.props.rating).then((response) => {
            this.setState({
                userRating: 0
            });
        });
    }
    
    componentDidMount(){
        this.fetchRating();
    }

    fetchRating(){
        getOwnRating(this.props.rating).then( (response) => {
            this.setState({
                userRating: response.data.score
            });
        });
    }
    
    render() {
        return (
            <>
              <StarRatings
                {...this.props}
                rating={this.state.userRating}
                changeRating={this.changeRating}
              />
              <br/>
              <br/>
              <div>
                <AddToListButton
                  mbid={this.props.albumMbid}
                >Ajouter à une liste</AddToListButton>
                <InterestButton
                  albumMbid={this.props.albumMbid}
                />
                {this.state.userRating !== 0 &&
                 <button className="button is-pulled-right is-borderless" title="Supprimer ma note" onClick={this.deleteRating}>
                  <span className="icon is-small">
                    <i className="fa fa-2x fa-trash"></i>
                  </span>
                    </button>
                }
              </div>
            </>
        );
    }
}
