import React from 'react';
import {Link} from 'react-router-dom';
import "./index.css";

let buttonClassMapping = {
    follows_you: "is-success",
    does_not_follow_you: "",
    is_yourself: "is-primary is-outlined"
};

let buttonContentMapping = {
    follows_you: "Vous suit",
    does_not_follow_you: "Suivi",
    is_yourself: "C'est vous !"
};

const ContactItem = ({
    profile_url,
    avatar,
    user
}) => (
    <div className="column is-one-third-mobile is-one-quarter-desktop">
      <figure className="image is-128x128 is-image-centered has-margin-bottom-3">
        <Link to={profile_url}>
          <img className="is-rounded" src={avatar} alt={user} />
        </Link>
      </figure>
      <h5 className="title is-size-5 has-text-centered" style={{
          "marginTop": "1.5rem"
      }}>
        <Link to={profile_url}>
          {user}
        </Link>
      </h5>
    </div>
);

export default ContactItem;
