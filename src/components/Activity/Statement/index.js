import React from 'react';

const ActivityStatement = ({actorComponent, verb, action, actionObjectComponent}) => {
    // let actorStatement = (<UserLink username={actor.name}/>);
    let verbStatement = <span>{verb}</span>;
    // let actionObject = <ActionObject
    //                      contentType={props.action_object_content_type}
    //                      object={props.action_object}
    //                    />;
    return (
        <>
          {actorComponent} {verbStatement} {actionObjectComponent}
        </>
    );
}

export default ActivityStatement;
