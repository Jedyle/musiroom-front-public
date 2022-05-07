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

const AddToInterests = ({anonymousContent = "Add to my interests", ...props}) => (
    <SwitchLogButton
      {...props}
      userRendering={(props) => <Base {...props}/>}
      anonymousChildren={anonymousContent}
    />
);

export default AddToInterests;
