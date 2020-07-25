import { api } from 'services/axios';

export function listArtists(name='', perPage=10){
    return api.get(`/artists?name__icontains=${name}&limit=${perPage}`);
}

export function getArtist(mbid){
    return api.get(`/artists/${mbid}`);
}

export function getSimilarArtists(mbid){
    return api.get(`/artists/${mbid}/similar`);
}

export function getArtistDiscography(mbid, search=''){
    return api.get(`/artists/${mbid}/discography?search=${search}`);
}
