import React from 'react';

const ActivityStatement = ({actorComponent, verb, action, actionObjectComponent, targetComponent}) => {
    let verbStatement = <span>{verb}</span>;
    console.log(targetComponent);
    return (
        <>
          {actorComponent} {verbStatement} {actionObjectComponent} {targetComponent}
        </>
    );
}

export default ActivityStatement;
