import React, { Component } from 'react';
import StarRatings from 'components/StarRatings';
import { getOwnRating, changeOwnRating, createOwnRating, deleteOwnRating } from 'services/OwnRatings';
import LoginPlaceholder from 'components/Utils/LoginFilters/Placeholder';

class Base extends Component {

    constructor(props){
        super(props);
        this.state = {
            userRating: 0  
        };
        this.changeRating = this.changeRating.bind(this);
        this.deleteRating = this.deleteRating.bind(this);
    }

    componentDidMount(){
        this.fetchRating();
    }

    fetchRating(){
        getOwnRating(this.props.rating).then((response) => {
            this.setState({
                userRating: response.data.score
            });
        });
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
    
    render(){
        let { userRating } = this.state;
        return (
            <>
              <StarRatings
                {...this.props}
                rating={userRating}
                changeRating={this.changeRating}
              />
              {"   "}
              {
                  userRating !== 0 &&
                      <button className="button is-borderless is-paddingless" title="Supprimer ma note" onClick={this.deleteRating}>
                        <span className="icon is-small mb-2 ml-3">
                          <i className="fa fa-lg fa-trash"></i>
                        </span>
                      </button>
              }        
            </>
        );        
    }
    
}

const RateAlbum = (props) => (
    <LoginPlaceholder
      {...props}
      userRendering={(props) => <Base {...props}/>}
      anonymousRendering={props => <div>Connectez-vous pour noter cet album !</div>}
    />
);

export default RateAlbum;
