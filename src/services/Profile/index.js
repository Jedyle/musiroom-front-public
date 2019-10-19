import { api } from 'services/axios';

export function getProfile(username){
    return api.get(
        `/users/${username}`
    );
};
 
