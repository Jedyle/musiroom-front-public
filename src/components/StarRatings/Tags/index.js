import React from 'react';
import { getUser } from 'services/Auth/api';
import './index.css';


const RatingTagsList = ({userRating, followeesRating, avgRating}) => (
    <div className="tags are-medium is-pulled-right">
      {
          getUser() && (
              <span className="tag is-user-rating"
                    title="Ma note">
                {userRating || '-'}
              </span>
          )
      }
      {
          getUser() && (
              <span className="tag is-followees-rating"
                    title="Moyenne de mes abonnements">
                {followeesRating ? followeesRating.toFixed(1) : '-'}
              </span>
          )
      }
      <span className="tag is-avg-rating"
            title="Note moyenne">
        {avgRating ? avgRating.toFixed(1) : '-'}
      </span>             
    </div>
);

export default RatingTagsList;
