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

export function getBadges(username){
    return api.get(
        `/users/${username}/badges`
    );
}
