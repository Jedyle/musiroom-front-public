import React from 'react';
import { UserLink } from 'containers/Links';
import Avatar from 'components/Profile/Avatar';

const UserSummaryPanel = ({user, additionalHeaders, children}) => (
    <div className="columns is-mobile box has-background-grey-lighter">
      <div className="column is-one-quarter">
        <Avatar
          avatar={`${process.env.REACT_APP_API_URL}${user.avatar}`}
          alt={user.username}
          size="is-128x128"
          figureStyle={{display: "auto"}}
        />
      </div>
      <div className="column">
        <p>
          <UserLink
            username={user.username}
            style={{fontSize: '22px'}}
          />    {" "}
          {additionalHeaders}          
        </p>
        <br/>
        <p>{user.description}</p>
        {children}
      </div>
    </div>
);

export default UserSummaryPanel;
