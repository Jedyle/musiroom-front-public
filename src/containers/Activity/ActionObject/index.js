import React from 'react';
import { GetAlbumLink, GetDiscussionLink, GetReviewLink } from 'containers/Links';

function ActionObject({contentType, object}){
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

export default ActionObject;
