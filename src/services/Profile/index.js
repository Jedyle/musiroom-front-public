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
        `/users/${username}/discussions/?page=${page}&ordering=${ordering}`
    );
}

export function getBadges(username){
    return api.get(
        `/users/${username}/badges`
    );
}
