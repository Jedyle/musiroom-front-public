import React from 'react';
import { ProfileLink } from 'components/Utils/Links';

const UserSummaryPanel = ({user, additionalHeaders, children}) => (
    <div className="columns is-mobile box has-background-grey-lighter">
      <div className="column is-one-quarter">
        <figure className="image is-128x128">
          <img className="is-rounded" src={`${process.env.REACT_APP_API_URL}${user.avatar}`} />
        </figure>
      </div>
      <div className="column">
        <p>
          <ProfileLink
            username={user.username}
            style={{fontSize: '22px'}}
          />    {" "}
          {additionalHeaders}
          {/* <span className="tag is-medium ml-3">{review.rating.score}</span> */}
        </p>
        <br/>
        <p>{user.description}</p>
        {children}
      </div>
    </div>
);

export default UserSummaryPanel;
