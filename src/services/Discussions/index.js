import { api } from 'services/axios';

export const DISCUSSION_TYPES = {
    album: 'album',
    artist: 'artist'
};

export function getDiscussionObjectName(discussion){
    switch (discussion.content_type){
    case null:
        return "General Discussion";
    case DISCUSSION_TYPES["album"]:
        return discussion.content_object.title;
    case DISCUSSION_TYPES["artist"]:
        return discussion.content_object.name;
    default:
        return '';
    }
}

export function getDiscussionType(discussion){
    switch (discussion.content_type){
    case null:
        return "General";
    case DISCUSSION_TYPES["album"]:
        return `${discussion.content_object.title}`;
    case DISCUSSION_TYPES["artist"]:
        return `${discussion.content_object.name}`;
    default:
        return null;
    }
}

export function getDiscussions({
    page=1,
    limit=10,
    title= "",
    author="",
    model="",
    objectId="",
    ordering="modified"
}){

    let queryParams = {
        page: page,
        limit: limit,
        user__username__icontains: author,
        object_id: objectId,
        title__icontains: title,
        ordering: ordering
    };

    if (model === null){
        queryParams['content_object_id__isnull'] = true;
    }
    else {
        queryParams['content_type__model'] = model;
    }

    return api.get('/discussions', {
        params: queryParams
    });
}

export function voteOnDiscussion(discussionId, vote){
    return api.put(`/discussions/${discussionId}/vote/`, {
        vote: vote
    });
}

export function createDiscussion(title, content, contentType=null, objectId="0"){
    // leaving objectId and contentType to their default means creating a general discussion
    return api.post('/discussions/', {
        title: title,
        content: content,
        object_id: objectId,
        content_type: contentType
    });
}

export function getDiscussion(discussionId){
    return api.get(`/discussions/${discussionId}`);
}

export function getObjectForDiscussionType(model, objectId){
    return api.get(`/discussions/object/${model}/${objectId}`);
}

export function editDiscussion(discussionId, title, content){
    return api.patch(`/discussions/${discussionId}/`, {
        title: title,
        content: content,
    });
}
