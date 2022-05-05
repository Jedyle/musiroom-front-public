import React from 'react';
import { Link } from 'react-router-dom';
import { GetAlbumLink, GetDiscussionLink, GetReviewLink, UserLink, GetListLink } from 'containers/Links';

function ActionTarget({contentType, object}){
    switch (contentType){
    case null || undefined:
        return null;
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
        return <UserLink username={object.name}/>;
    case "listobj":
        return (
            <>
              to the list <GetListLink name={object.name} id={object.id}/>
            </>
        );
    default:
        return object && <span>{object.name}</span>;
    }
}

export default ActionTarget;
