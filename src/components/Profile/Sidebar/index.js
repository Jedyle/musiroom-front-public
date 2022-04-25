import React from 'react';
import './index.css';
import {formatDate, timeSince} from 'utils/date';

const ProfileSidebar = ({
    avatar,
    user,
    first_name,
    sex,
    last_activity,
    date_joined,
    user_buttons,
    follows_you
}) => (
    <div className="card profile-sidebar">
      <div className="card-image">
        <figure className="image is-square">
          <img
            src={avatar}
            alt="Avatar" />
        </figure>
      </div>
      <div className="card-content is-paddingless">
        <div className="content">
          <div className="list">
            {user ? (
                <li className="list-item has-text-centered"
                    style={{padding: '1.25rem'}}>
                  {user}
                  <br/>
                <small> {follows_you ? "Follows you" : ""} </small>
                </li>) : ""}
            {
                [first_name, sex].map((value) => (
                    value ?
                        <li key={value} className="list-item has-padding-10 has-text-centered">
                          {value}
                        </li> : ""   
                ))
            }
            {
                last_activity ?
                    <li className="list-item has-padding-10 has-text-centered">
                      Last activity : {timeSince(last_activity)}
                    </li> : ""   
            }
            {
                date_joined ?
                    <li className="list-item has-padding-10 has-text-centered">
                      Registration date : {formatDate(date_joined)}
                    </li> : ""   
            }
            {user_buttons}
          </div>
        </div>
      </div>      
    </div>
);

export default ProfileSidebar;
