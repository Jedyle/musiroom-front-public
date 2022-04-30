import React from 'react';

const ActivityStatement = ({actorComponent, verb, action, actionObjectComponent, targetComponent}) => {
    let verbStatement = <span>{verb}</span>;
    return (
        <>
          {actorComponent} {verbStatement} {actionObjectComponent} {targetComponent}
        </>
    );
}

export default ActivityStatement;
