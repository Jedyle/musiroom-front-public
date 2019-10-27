import React from 'react';
import { Link } from 'react-router-dom';

const OwnUserButton = ({
    changeProfileLink,
    settingsLink
}) => (
    <li className="list-item has-text-centered" style={{padding: '1.25rem'}}>
      <Link to={changeProfileLink}
            className="button is-link is-outlined has-margin-bottom-5 is-fullwidth">
        <span>
          <i className="fa fa-user"></i> {" "}
          Modifier mon profil
        </span>
      </Link>
    </li>);

export default OwnUserButton;
