import { api } from 'services/axios';

export const getTop = ({genre, period}) => {
    return api.get(`/tops/${genre}/${period}`);
}
