import { api } from 'services/axios';

export function getAlbum(mbid){
    return api.get(`/albums/${mbid}`);
}

export function getAlbumLinks(mbid){
    return api.get(`/albums/${mbid}/links`);
}

export function getAlbumsFromSameArtist(mbid){
    return api.get(`/albums/${mbid}/same_artist`);
}

export function listAlbums(title='', perPage=10){
    return api.get(`/albums?title__icontains=${title}&limit=${perPage}`);
}

export function getLatestAlbums(){
    return api.get(`/albums/latest/`);
}

export function getAlbumGenres(mbid){
    return api.get(`/albums/${mbid}/genres`);
}

export function addAlbumGenre(mbid, slug){
    return api.post(`/albums/${mbid}/genres/`, {
        genre: slug
    });
}

export function voteOnAlbumGenre(mbid, genreSlug, vote){
    // vote is either 'up', 'down' or 'null' (to cancel)
    return api.put(`/albums/${mbid}/genres/${genreSlug}/vote/`, {
        vote: vote
    });
}
