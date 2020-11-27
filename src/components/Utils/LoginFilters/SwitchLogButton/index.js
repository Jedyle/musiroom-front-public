import React from 'react';

import LoginPlaceholder from 'components/Utils/LoginFilters/Placeholder';
import LoginButton from 'components/Utils/LoginFilters/LoginButton';

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
