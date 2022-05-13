import React from 'react';
import SwitchLogButton from 'containers/LoginFilters/SwitchLogButton';


function Base({ onChangeCollection, inCollection, contentInCollection = "In collection", contentNotInCollection = "Add to collection", ...props}){

    return (
        <button
          {...props}
          onClick={onChangeCollection}
          className={`button has-margin-right-5 mb-1 ${inCollection && "is-success"}`}
        >
          {inCollection ? contentInCollection : contentNotInCollection}
        </button>
    );        
}

const AddToCollection = ({anonymousContent = <><i className="fa fa-headphones" style={{marginRight: "7px"}}></i> Add to collection</>, ...props}) => (
    <SwitchLogButton
      {...props}
      userRendering={(props) => <Base {...props}/>}
      anonymousChildren={anonymousContent}
    />
);

export default AddToCollection;
