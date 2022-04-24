import React from 'react';

import LoginPlaceholder from 'containers/LoginFilters/Placeholder';
import LoginButton from 'containers/LoginFilters/LoginButton';

const SwitchLogButton = ({userRendering, anonymousChildren,  ...props}) => (
    <LoginPlaceholder
      className="button"
      {...props}
      userRendering={userRendering}
      anonymousRendering={(props) => (
          <LoginButton {...props}>{anonymousChildren}</LoginButton>
      )}
    />
);

export default SwitchLogButton;
