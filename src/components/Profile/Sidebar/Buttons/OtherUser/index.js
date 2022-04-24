import React from 'react';
import { Link } from 'react-router-dom';

const OtherUserButtons = ({
    messageLink,
    isFollowed,
    onToggleFollow
}) => (
    <li className="list-item has-text-centered">
      <button
        className={`button is-fullwidth has-margin-bottom-5 is-success ${isFollowed ? 'is-outlined' : ''}`}
        onClick={onToggleFollow}
      >
        {isFollowed ? "Followed" : "Follow"}
      </button>
      <Link to={messageLink} className="button is-fullwidth">
        Message
      </Link>
    </li>
);

export default OtherUserButtons;
