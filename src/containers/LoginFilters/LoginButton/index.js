import React from 'react';
import { openLoginModal } from 'services/Auth/api';

const LoginButton = ({children, ...props}) => (
    <button {...props}
            onClick={openLoginModal}
    >
      {children}
    </button>
);

export default LoginButton;
