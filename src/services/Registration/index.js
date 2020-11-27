import { api } from 'services/axios';

export function register(data){
    return api.post(`/registration/`, data);
} 

export function resendLink(username){
    return api.post(`/registration/${username}/resend_email/`);
}

export function confirmToken(token, uid){
    return api.post(`/registration/activate/${uid}/${token}/`);
}
