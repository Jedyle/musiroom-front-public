import React, { useState, useEffect } from 'react';
import { getUser } from 'services/Auth/api';
import './index.css';
import AlbumPopover from 'containers/Album/Popover';


const FormattedUserRating = ({userRating}) => {
    if (userRating){
        if (userRating.score){
            return userRating.score;
        }
        else if (userRating.is_in_collection){
            return (
                <span className="icon">
                  <i className="fa fa-headphones"></i>
                </span>                    
            )
        }
        else if (userRating.is_interested){
            return (
                <span className="icon">
                  <i className="fa fa-map-marker"></i>
                </span>
            );                
        }
    }       
    return '-';
}

const RatingTagsList = ({mbid, ratingId, userRating, followeesRating, avgRating, onChangeRating, afterLoadPopover}) => {

    return (
        <div className="tags are-medium is-pulled-right">
          {
              getUser() && (
                  <AlbumPopover
                    mbid={mbid}
                    ratingId={ratingId}
                    userRating={userRating}
                    onChangeRating={onChangeRating}
                    afterLoad={afterLoadPopover}
                  >
                    <span className="tag is-user-rating mr-1" style={{cursor: 'pointer', backgroundClip: 'border-box'}}
                          title="My rating">
                      <FormattedUserRating userRating={userRating}/>
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

export default RatingTagsList;
