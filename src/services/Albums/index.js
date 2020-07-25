import { api } from 'services/axios';

export function getAlbum(mbid){
    return api.get(`/albums/${mbid}`);
}

export function getAlbumYoutubeLink(mbid){
    return api.get(`/albums/${mbid}/youtube_link`);
}

export function getAlbumsFromSameArtist(mbid){
    return api.get(`/albums/${mbid}/same_artist`);
}

export function listAlbums(title='', perPage=10){
    return api.get(`/albums?title__icontains=${title}&limit=${perPage}`);
}
