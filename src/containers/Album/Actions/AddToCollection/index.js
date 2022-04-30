import React from 'react';
import SwitchLogButton from 'containers/LoginFilters/SwitchLogButton';


function Base({ onChangeCollection, inCollection, contentInCollection = "In collection", contentNotInCollection = "Add to collection", ...props}){

    return (
        <button
          {...props}
          onClick={onChangeCollection}
          className={`button ${inCollection && "is-success"}`}
        >
          {inCollection ? contentInCollection : contentNotInCollection}
        </button>
    );        
}

const AddToCollection = ({anonymousContent = "Add to collection", ...props}) => (
    <SwitchLogButton
      {...props}
      userRendering={(props) => <Base {...props}/>}
      anonymousChildren={anonymousContent}
    />
);

export default AddToCollection;
