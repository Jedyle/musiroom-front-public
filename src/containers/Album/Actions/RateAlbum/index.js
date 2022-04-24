import React from 'react';
import StarRatings from 'components/StarRatings';
import LoginPlaceholder from 'containers/LoginFilters/Placeholder';

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
              <button className="button is-borderless is-paddingless" title="Delete my rating" onClick={deleteRating}>
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
      anonymousRendering={props => <div>Log in to rate this album !</div>}
    />
);

export default RateAlbum;
