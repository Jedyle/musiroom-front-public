import React from 'react';
import { getUser } from 'services/Auth/api';

// if a user if connected, then use userRendering() component
// otherwise, use an anonymous component
const LoginPlaceholder = ({userRendering, anonymousRendering, ...props}) => (
    <>
      {
          getUser() ?
              <>{userRendering(props)}</>
          :
          <>{anonymousRendering(props)}</>
      }
    </>
);

export default LoginPlaceholder;
