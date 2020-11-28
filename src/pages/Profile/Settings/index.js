import React from 'react';
import PublicProfileForm from './PublicProfile';
import PasswordForm from './Password';
import AvatarForm from './Avatar';
import DeleteUserForm from './DeleteUser';

const SettingsForm = (props) => (
    <div>
      <PublicProfileForm {...props} />
      <hr/>
      <AvatarForm />
      <hr/>
      <PasswordForm />
      <hr/>
      <DeleteUserForm />
    </div>  
);

export default SettingsForm;
