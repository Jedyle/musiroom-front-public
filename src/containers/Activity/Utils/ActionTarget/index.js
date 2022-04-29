import React from 'react';
import { GetAlbumLink, GetDiscussionLink, GetReviewLink, UserLink } from 'containers/Links';

function ActionTarget({contentType, object}){
    switch (contentType){
    case null || undefined:
        return null
    case "album":
        return (
            <>
              <GetAlbumLink mbid={object.mbid} title={object.name}/>
            </>
        );
    case "discussion":
        return (
            <>
              on <GetDiscussionLink id={object.id} name={object.name}/>
            </>
        );
    case "review":
        return (
            <>
              on <GetReviewLink title={object.name} albumId={object.album_id} reviewId={object.id}/>
            </>
        );
    case "user":
        return <UserLink username={object.name}/>
    default:
        return object && <span>{object.name}</span>;
    }
}

export default ActionTarget;
