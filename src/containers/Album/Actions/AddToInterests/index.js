import React from 'react';
import SwitchLogButton from 'containers/LoginFilters/SwitchLogButton';


function Base({ onChangeInterest, interest, contentWhenInterest = "I want to listen", contentWhenNoInterest = "Add to my interests", ...props}){

    return (
        <button
          {...props}
          onClick={onChangeInterest}
          className={`button has-margin-right-5 mb-1 ${interest && "is-success"}`}
        >
          {interest ? contentWhenInterest : contentWhenNoInterest}
        </button>
    );        
}

const AddToInterests = ({anonymousContent = <><i className="fa fa-map-marker" style={{marginRight: "7px"}}></i> Listen later</>, ...props}) => (
    <SwitchLogButton
      {...props}
      userRendering={(props) => <Base {...props}/>}
      anonymousChildren={anonymousContent}
    />
);

export default AddToInterests;
