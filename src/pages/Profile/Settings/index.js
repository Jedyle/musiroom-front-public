import React from 'react';
import PublicProfileForm from './PublicProfile';
import PasswordForm from './Password';
import AvatarForm from './Avatar';

const SettingsForm = (props) => (
    <div>
      <PublicProfileForm {...props} />
      <hr/>
      <AvatarForm />
      <hr/>
      <PasswordForm />
    </div>  
);

export default SettingsForm;
