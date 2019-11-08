import { api } from 'services/axios';

export function getDiscussionType(discussion){
    switch (discussion.content_type){
    case null:
        return "discussion générale";
    case "album":
        return `sur ${discussion.content_object.title}`;
    case "artist":
        return `sur ${discussion.content_object.name}`;
    default:
        return '';
    }
}

export function getDiscussionLinkForContentObject(contentType, contentObject){
    switch(contentType){
    case "artist":
        return "";
    case "album":
        return "";
    case null:
        return "";
    default:
        return "";
    }
}

export function getDiscussionLink(discussion){
    return "/";
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
        queryParams['content_object__model'] = model;
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
