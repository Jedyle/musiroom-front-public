import React from 'react';
import StarRatings from 'components/StarRatings';
import LoginPlaceholder from 'components/Utils/LoginFilters/Placeholder';

const Base = ({ userRating, changeRating, deleteRating, ...props }) => (
    <>
      <StarRatings
        {...props}
        rating={userRating}
        changeRating={changeRating}
      />
      {"   "}
      {
          userRating !== 0 &&
              <button className="button is-borderless is-paddingless" title="Supprimer ma note" onClick={deleteRating}>
                <span className="icon is-small mb-2 ml-3">
                  <i className="fa fa-lg fa-trash"></i>
                </span>
              </button>
      }        
    </>
    
);


const RateAlbum = (props) => (
    <LoginPlaceholder
      {...props}
      userRendering={(props) => <Base {...props}/>}
      anonymousRendering={props => <div>Connectez-vous pour noter cet album !</div>}
    />
);

export default RateAlbum;
