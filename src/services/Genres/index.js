import { api } from 'services/axios';

export const getGenres = () => (api.get(`/genres`));

export const getGenre = (slug) => (api.get(`/genres/${slug}`));

export const listAllGenres = () => (api.get('/all_genres'));

export const createGenre = (name, description, parent) => (api.post('/genres/', {
    name: name,
    description: description,
    parent: parent
}));
