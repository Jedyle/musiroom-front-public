import { api } from 'services/axios';

export function getAlbum(mbid){
    return api.get(`/albums/${mbid}`);
}
