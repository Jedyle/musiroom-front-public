import { api } from 'services/axios';

export function register(data){
    return api.post(`/registration/`, data);
} 

export function confirmToken(token, uid){
    return api.post(`/registration/activate/${uid}/${token}/`);
}
