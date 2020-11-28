import React from 'react';
import { UserLink, GetAlbumLink, GetDiscussionLink, GetReviewLink } from 'pages/Links';

function ActionObject({contentType, object}){
    console.log(object);
    switch (contentType){
    case "album":
        return <GetAlbumLink mbid={object.mbid} title={object.name}/>;
    case "discussion":
        return <GetDiscussionLink id={object.id} name={object.name}/>;
    case "review":
        return <GetReviewLink title={object.name} albumId={object.album_id} reviewId={object.id}/>;
    default:
        return object && <span>{object.name}</span>;
    }
}

function ActivityStatement(props){
    let actorStatement = (<UserLink username={props.actor.name}/>);
    let verbStatement = <span>{props.verb}</span>;
    let actionObject = <ActionObject
                         contentType={props.action_object_content_type}
                         object={props.action_object}
                       />;
    return (
        <>
          {actorStatement} {verbStatement} {actionObject}
        </>
    );
}

export default ActivityStatement;
