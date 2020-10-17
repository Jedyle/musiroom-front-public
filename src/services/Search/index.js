import { api } from 'services/axios';

export const search = ({
    model,
    query,
    method = "advanced",
    page = 1
}) => (
    api.get(`/search`, {
        params: {
            model: model,
            query: query,
            method: method,
            page: page
        }})
);


export const searchUsers = ({
    query,
    page = 1
}) => (
    api.get(`/users`, {
        params: {
            user__username__icontains: query,
            ordering: 'user',
            page: page
        }
    })
);
