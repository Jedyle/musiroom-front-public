import React from 'react';
import { toHumanDate } from 'utils/date';

function ActivityItem({timestamp, activityMedia, activityStatement}){
    return (
        <div className="box">
          <article className="media">
            <div className="media-left">
              {activityMedia}
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  {activityStatement}
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
