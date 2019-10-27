import React from 'react';
import SettingsForm from './Settings';
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
      body={SettingsForm}
    />
);

export { ProfileWithTabs, ProfileWithEditForm };
