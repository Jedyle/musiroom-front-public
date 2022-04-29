import React, { useState, useEffect } from 'react';
import { getUser } from 'services/Auth/api';
import './index.css';
import PropTypes from 'prop-types';
import AlbumPopover from 'containers/Album/Popover';

const RatingTagsList = ({mbid, userRating, followeesRating, avgRating}) => {

    const [realUserRating, changeRealUserRating] = useState(0);

    useEffect(() => {
        changeRealUserRating(userRating);
    }, [userRating]);

    const changeRating = (newRating) => {
        changeRealUserRating(newRating);
    }

    const deleteRating = () => {
        changeRealUserRating(null);
    }
    
    return (
        <div className="tags are-medium is-pulled-right">
          {
              getUser() && (
                  <AlbumPopover
                    mbid={mbid}
                    changeRating={changeRating}
                    deleteRating={deleteRating}
                  >
                    <span className="tag is-user-rating mr-1" style={{cursor: 'pointer', backgroundClip: 'border-box'}}
                          title="My rating">
                      {realUserRating || '-'}
                    </span>
                  </AlbumPopover>              
              )
          }
          {
              getUser() && (
                  <span className="tag is-followees-rating"
                        title="Average of my followees">
                    {followeesRating ? followeesRating.toFixed(1) : '-'}
                  </span>
              )
          }
          <span className="tag is-avg-rating"
                title="Average rating">
            {avgRating ? avgRating.toFixed(1) : '-'}
          </span>             
        </div>
    )
}

RatingTagsList.propTypes = {
    userRating: PropTypes.number,
    followeesRating: PropTypes.number,
    avgRating: PropTypes.number
};

export default RatingTagsList;
