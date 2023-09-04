import React from 'react';
import { Link } from 'react-router-dom';
import PublicProfileForm from './PublicProfile';
import PasswordForm from './Password';
import AvatarForm from './Avatar';
import DeleteUserForm from './DeleteUser';
import Title from 'components/Utils/Title';

import { profileUrl } from 'pages/urls';

const SettingsForm = (props) => (
    <div>
      <Title title="Settings"/>
      <Link to={profileUrl(props.username)}>{"<"} Back to account</Link>
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
