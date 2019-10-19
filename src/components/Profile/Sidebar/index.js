import React from 'react';
import './index.css';
import {Link} from 'react-router-dom';
import {formatDate} from 'utils/date';

const ProfileSidebar = ({
    avatar,
    user,
    first_name,
    sex,
    last_activity,
    date_joined,
    chg_profile_link,
    settings_link
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
                </li>) : ""}
            {
                [first_name, sex].map((value) => (
                    value ?
                        <li className="list-item has-padding-10 has-text-centered">
                          {value}
                        </li> : ""   
                ))
            }
            {
                    last_activity ?
                        <li className="list-item has-padding-10 has-text-centered">
                          Dernière activité : {formatDate(last_activity)}
                        </li> : ""   
            }
            {
                    date_joined ?
                        <li className="list-item has-padding-10 has-text-centered">
                          Inscrit le : {formatDate(date_joined)}
                        </li> : ""   
            }
            {chg_profile_link && settings_link ?
             (
                 <li className="list-item has-text-centered" style={{padding: '1.25rem'}}>
                   <Link to={chg_profile_link}
                         className="button is-link is-outlined is-fullwidth">
                     <span>
                       <i className="fa fa-user"></i> {" "}
                       Profile
                     </span>
                   </Link>
                   <Link to={settings_link}
                         className="button is-info is-outlined is-fullwidth">
                     <span>
                       <i className="fa fa-cog"></i> {" "}
                       Settings
                     </span>
                   </Link>
                 </li>) : ""}
            
          </div>
        </div>
      </div>      
    </div>
);

export default ProfileSidebar;
