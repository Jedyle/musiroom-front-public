import React from 'react';
import { Link } from 'react-router-dom';

const OtherUserButtons = ({
    message_link,
    is_followed,
    onToggleFollow
}) => (
    <li className="list-item has-text-centered">
      <button
        className={`button is-fullwidth has-margin-bottom-5 is-success ${is_followed ? 'is-outlined' : ''}`}
        onClick={onToggleFollow}
      >
        {is_followed ? "Suivi" : "Suivre"}
      </button>
      <Link to={message_link} className="button is-fullwidth">
        Message
      </Link>
    </li>
);

export default OtherUserButtons;
