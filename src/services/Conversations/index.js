import { api } from 'services/axios';

export const listConversations = ({page=1, limit=10}) => api.get(`/conversations/`, {
    params: {
        page: page,
        limit: limit
    }
});

export const getConversation = (id) => api.get(`/conversations/${id}/`);

export const createConversation = (data) => api.post(`/conversations/`, data);

export const updateConversation = (id, data) => api.put(`/conversations/${id}/`, data);

export const getMessages = (convId, {page=1, limit=15}) => api.get(`/conversations/${convId}/messages/`, {
    params: {
        page: page,
        limit: limit
    }
});

export const createMessage = (convId, text) => api.post(`/conversations/${convId}/messages/`, {
    text: text
});
