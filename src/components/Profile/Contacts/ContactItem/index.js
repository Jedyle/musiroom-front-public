import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'components/Profile/Avatar';

import "./index.css";

const ContactItem = ({
    profile_url,
    avatar,
    user
}) => (
    <div className="column is-one-third-mobile is-one-quarter-desktop">
      <Link to={profile_url}>
        <Avatar
          avatar={avatar}
          alt={user}
          size="is-128x128 is-image-centered has-margin-bottom-3"
          figureStyle={{display: "auto"}}
        />
      </Link>
      <p className="title is-size-5 has-text-centered" style={{
          "marginTop": "1.5rem"
      }}>
        <Link to={profile_url}>
          {user}
        </Link>
      </p>
    </div>
);

export default ContactItem;
