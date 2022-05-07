import { api } from 'services/axios';

export function createList({title, description, ordered}){
    return api.post(`/lists/`, {title, description, ordered});
}

export function getLists({
    page=1,
    limit=20,
    title="",
    ordering="",
    notEmpty=true
}){
    return api.get(`/lists/`, {
        params: {
            page: page,
            limit: limit,
            ordering: ordering,
            title__icontains: title,
            not_empty: notEmpty
        }
    });
}

export function getList(id){
    return api.get(`/lists/${id}`);
}

export function updateList(id, data){
    return api.patch(`/lists/${id}/`, data);
}

export function getListItems({id, page=1, perPage=10}){
    return api.get(`/lists/${id}/items/`, {
        params: {
            page: page,
            limit: perPage
        },
        validateStatus: (status) => status < 500
    });
}

export function getAllListItems({id}){
    return api.get(`/lists/${id}/items/`, {
        params: {
            no_page: true,
        }
    });
}

export function getListItemPositions(id){
    return api.get(`/lists/${id}/items/positions`);
}

export function createListItem({listId, albumId, comment=""}){
    return api.post(`/lists/${listId}/items/`, {
        album: albumId,
        comment: comment
    });
}

export function updateListItem(listId, itemId, data){
    return api.patch(`/lists/${listId}/items/${itemId}/`, data);
}

export function updateListItemPosition(listId, itemId, newPosition){
    return api.put(`/lists/${listId}/items/${itemId}/position/`, {
        order: newPosition
    });
}

export function deleteListItem(listId, itemId){
    return api.delete(`/lists/${listId}/items/${itemId}/`);
}

export function voteOnList(id, vote){
    return api.put(`/lists/${id}/vote/`, {
        vote: vote
    });
}
