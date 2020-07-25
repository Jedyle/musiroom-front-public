import { api } from 'services/axios';

export function getCommentsForObject({
    contentType,
    objectId,
    page=1,
    limit=20,
    ordering='-vote_score'}){
    return api.get('/comments', {
        params: {
            content_type__model: contentType,
            object_pk: objectId,
            page: page,
            limit: limit,
            ordering: ordering
        }
    });
}

export function createComment({
    content,
    parentId = null,
    contentType,
    objectId
}){
    return api.post('/comments/', {
        comment: content,
        parent: parentId,
        content_type: contentType,
        object_pk: objectId
    });    
}

export function updateComment(commentId, content){
    return api.put(`/comments/${commentId}/`, {
        comment: content
    });
}

export function voteOnComment(commentId, vote){
    return api.put(`/comments/${commentId}/vote/`, {
        vote: vote 
    });
}

export function deleteComment(commentId){
    return api.delete(`/comments/${commentId}/`);
}
