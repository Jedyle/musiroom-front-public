import { api } from 'services/axios';

export function getProfile(username){
    return api.get(
        `/users/${username}`
    );
};

export function getTopAlbums(username){
    return api.get(
        `/users/${username}/top`
    );
}

export function getDiscussions(username, page=1, ordering=''){
    return api.get(
        `/users/${username}/discussions/?page=${page}&ordering=${ordering}&limit=10`
    );
}

export function getBadges(username){
    return api.get(
        `/users/${username}/badges`
    );
}

export function getLists(username, page=1, limit=10){
    return api.get(
        `/users/${username}/lists?page=${page}&limit=${limit}`
    );
}

export function getUserListItemsWithAlbum(mbid){
    return api.get(
        `/lists_with_album?mbid=${mbid}`
    );
}

export function getListsWithoutAlbum(username, mbid, page=1){
    return api.get(
        `/users/${username}/lists?page=${page}&limit=100&not_contains_album=${mbid}`
    );
}

export function getRatings({username, page=1, albumTitle="", ordering="", filtering={}}){
    let params = {
        page: page,
        limit: 10,
        ordering: ordering,
        album_title__icontains: albumTitle,
        ...filtering
    }
    return api.get(
        `/users/${username}/ratings/`, {params: params}
    );
}

export function getReviews({username, page=1, albumTitle="", ordering="", filtering={}}){
    return api.get(
      `/users/${username}/reviews?page=${page}&limit=10&ordering=${ordering}&album_title__icontains=${albumTitle}`
    );
}

export function getInterests({username, page=1, albumTitle="", ordering=""}){
    return api.get(
           `/users/${username}/interests?page=${page}&limit=10&ordering=${ordering}&album_title__icontains=${albumTitle}`
    );
}
