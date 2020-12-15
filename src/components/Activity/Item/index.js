import React from 'react';
import ActivityStatement from 'components/Activity/Statement';
import { toHumanDate } from 'utils/date';
import Avatar from 'components/Profile/Avatar';

function ActivityItem({timestamp, ...props}){
    return (
        <div className="box">
          <article className="media">
            <div className="media-left">
              <Avatar
                avatar={process.env.REACT_APP_API_URL + props.actor.avatar}
                size="is-64x64"
                alt={props.actor.name}
              />
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
