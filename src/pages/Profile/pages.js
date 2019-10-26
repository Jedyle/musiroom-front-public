import React from 'react';
import PublicProfileTabs from './PublicTabs';
import Profile from './index';

const ProfileWithTabs = (props) => (
    <Profile
      {...props}
      body={PublicProfileTabs}
    />
);

export {ProfileWithTabs};
