import { api } from 'services/axios';

export function getSelfActivity({page=1, limit=20}){
    return api.get('/activity/self/', {
        params: {
            page: page,
            limit: limit
        }
    });
}

export function getAllActivity({page=1, limit=20}){
    return api.get('/activity/all/', {
        params: {
            page: page,
            limit: limit
        }
    });
}
