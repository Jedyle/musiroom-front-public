import { api } from 'services/axios';

export const getTop = ({genre, period}) => {
    if (genre === "tout") {
        genre = "all";
    }
    if (period === "tout") {
        period = "all";
    }
    return api.get(`/tops/${genre}/${period}`);
}
