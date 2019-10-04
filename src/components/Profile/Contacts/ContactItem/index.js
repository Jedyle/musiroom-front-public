import React from 'react';
import {Link} from 'react-router-dom';
import "./index.css";

let buttonClassMapping = {
    follows_you: "is-success",
    does_not_follow_you: "",
    is_yourself: "is-primary is-outlined"
};

let buttonContentMapping = {
    follows_you: "Follows you",
    does_not_follow_you: "Followed",
    is_yourself: "It's you !"
};

const ContactItem = ({
    profile_url,
    avatar,
    username,
    following_status,
    onButtonClick
}) => (
    <div className="column is-one-third-mobile is-one-quarter-desktop">
      <figure className="image is-128x128 is-image-centered has-margin-bottom-3">
        <Link to={profile_url}>
          <img className="is-rounded" src={avatar} alt={username} />
        </Link>
      </figure>
      <h5 className="title is-size-5 has-text-centered" style={{
          "marginTop": "1.5rem"
      }}>
        <Link to={profile_url}>
          {username}
        </Link>
      </h5>
      <button className={
          `button is-fullwidth ${buttonClassMapping[following_status]}`
      } onClick={onButtonClick}>
        {buttonContentMapping[following_status] || "Followed"}
      </button>
    </div>
);

export default ContactItem;
