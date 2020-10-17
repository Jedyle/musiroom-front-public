import React from 'react';
import { Link } from 'react-router-dom';
import { profileUrl } from 'pages/urls';

export const ProfileLink = ({username, style}) => (
    <>
      {" "}
      <Link style={style} to={profileUrl(username)}>
        {username}
      </Link>
    </>
);
