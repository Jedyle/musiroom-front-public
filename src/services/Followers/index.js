import { api } from 'services/axios';
import { getCurrentUserName } from 'store';

export function toggleFollow(username){
    return api.post('followees/', {
        user: username
    });
}

export function findIfUserFollows(username){
    return api.get(`users/${getCurrentUserName()}/followees/?username=${username}`);
};

export function findIfUserIsFollowedBy(username){
    return api.get(`users/${getCurrentUserName()}/followers/?username=${username}`);
}

export function getUserFollowers(username){
    return api.get(`users/${username}/followers`);
}

export function getUserFollowees(username){
    return api.get(`users/${username}/followees`);
}
