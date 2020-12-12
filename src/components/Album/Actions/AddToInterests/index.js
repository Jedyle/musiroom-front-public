import React, { Component } from 'react';
import { changeOwnInterest, getOwnInterest } from 'services/OwnRatings';
import SwitchLogButton from 'components/Utils/LoginFilters/SwitchLogButton';

class Base extends Component {

    constructor(props){
        super(props);
        this.state = {
            ownInterest: false  
        };
    }

    fetchInterest = () => {
        getOwnInterest(this.props.mbid).then((response) => {
            this.setState({
                ownInterest: response.data.interest 
            });
        });
    }

    changeInterest = () => {
        changeOwnInterest(this.props.mbid, !this.state.ownInterest).then((response) => {
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
        let { contentWhenInterest = "Je veux l'écouter", contentWhenNoInterest = "Ajouter à mes envies"} = this.props;
        return (
            <button
              {...this.props}
              onClick={this.changeInterest}
              className={`button ${ownInterest && "is-success"}`}
            >
              {ownInterest ? contentWhenInterest : contentWhenNoInterest}
            </button>
        );
    }
}

const InterestButton = ({anonymousContent = "Ajouter à mes envies", ...props}) => (
    <SwitchLogButton
      {...props}
      userRendering={(props) => <Base {...props}/>}
      anonymousChildren={anonymousContent}
    />
);

export default InterestButton;
