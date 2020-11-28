import React from 'react';
import ActivityStatement from 'components/Activity/Statement';
import { toHumanDate } from 'utils/date';

function ActivityItem({timestamp, ...props}){
    return (
        <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={process.env.REACT_APP_API_URL + props.actor.avatar} alt={props.actor.name} />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <ActivityStatement
                    {...props}
                  />
                  {" - "}
                  <small>{toHumanDate(timestamp)}</small>
                </p>
              </div>
            </div>
          </article>
        </div>
    );
};

export default ActivityItem;
