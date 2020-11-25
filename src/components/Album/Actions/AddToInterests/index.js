import React, { Component } from 'react';
import { changeOwnInterest, getOwnInterest } from 'services/OwnRatings';

export default class InterestButton extends Component {

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
        let { ownInterest } = this.state;
        return (
            <button
              className={`button ${ownInterest && "is-success"}`}
              onClick={this.changeInterest}              
            >
            {ownInterest ? "Je veux l'écouter" : "Ajouter à mes envies"}
            </button>
        );
    }
}
