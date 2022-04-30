import React from 'react';
import SwitchLogButton from 'containers/LoginFilters/SwitchLogButton';


function Base({ onChangeInterest, interest, contentWhenInterest = "I want to listen", contentWhenNoInterest = "Add to my interests", ...props}){

    return (
        <button
          {...props}
          onClick={onChangeInterest}
          className={`button ${interest && "is-success"}`}
        >
          {interest ? contentWhenInterest : contentWhenNoInterest}
        </button>
    );        
}

const AddToInterests = ({anonymousContent = "Add to my interests", ...props}) => (
    <SwitchLogButton
      {...props}
      userRendering={(props) => <Base {...props}/>}
      anonymousChildren={anonymousContent}
    />
);

export default AddToInterests;
