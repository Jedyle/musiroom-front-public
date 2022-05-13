import { api } from 'services/axios';

export function sendFeedback(data){
    return api.post('/feedbacks/', data);
}
