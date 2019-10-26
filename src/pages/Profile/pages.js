import React from 'react';
import PublicProfileForm from './Settings/PublicProfileForm';
import PublicProfileTabs from './PublicTabs';
import Profile from './index';

const ProfileWithTabs = (props) => (
    <Profile
      {...props}
      body={PublicProfileTabs}
    />
);

const ProfileWithEditForm = (props) => (
    <Profile
      {...props}
      body={PublicProfileForm}
    />
);

export { ProfileWithTabs, ProfileWithEditForm };
