import React from 'react';
import PublicProfileForm from './PublicProfile';
import PasswordForm from './Password';
import AvatarForm from './Avatar';
import DeleteUserForm from './DeleteUser';
import Title from 'components/Utils/Title';

const SettingsForm = (props) => (
    <div>
      <Title title="Settings"/>
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
