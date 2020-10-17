import React, { Component } from 'react';
import StarRatings from 'components/StarRatings';
import { getOwnRating, changeOwnRating, createOwnRating, deleteOwnRating, changeOwnInterest, getOwnInterest } from 'services/OwnRatings';


class InterestButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            ownInterest: false  
        };
        this.fetchInterest = this.fetchInterest.bind(this);
        this.changeInterest = this.changeInterest.bind(this);
    }

    fetchInterest(){
        getOwnInterest(this.props.albumMbid).then((response) => {
            this.setState({
                ownInterest: response.data.interest 
            });
        });
    }

    changeInterest(){
        changeOwnInterest(this.props.albumMbid, !this.state.ownInterest).then((response) => {
            this.setState({
                ownInterest: response.data.interest 
            });
        });
    }
    
    componentDidMount(){
        this.fetchInterest();
    }
    
    render() {
        return (
            <button
              className={`button ${this.state.ownInterest && "is-success"}`}
              onClick={this.changeInterest}              
            >
            {this.state.ownInterest ? "Je veux l'écouter" : "Ajouter à mes envies"}
            </button>
        );
    }
}

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
                <button className="button has-margin-right-5">Ajouter à une liste</button>
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
