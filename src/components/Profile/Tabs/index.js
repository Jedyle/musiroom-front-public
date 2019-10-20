import React from 'react';

const ProfileTabs = ({
    tabs,
}) => (
    <div className="tabs is-toggle">
      <ul>
        {tabs}
      </ul>
    </div>
);

export default ProfileTabs;
