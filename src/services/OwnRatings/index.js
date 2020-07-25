import { api } from 'services/axios';

export function getOwnRating(rating_id){
    return api.get(
        `/ratings/${rating_id}/self`
    );
}

export function createOwnRating(rating_id, score){
    return api.post(
        `/ratings/${rating_id}/user_ratings`, {
            score: score
        }
    );
}

export function changeOwnRating(rating_id, score){
    return api.put(
        `/ratings/${rating_id}/self`, {
            score: score
        }
    );
}

export function deleteOwnRating(rating_id){
    return api.delete(
        `/ratings/${rating_id}/self`
    );
}


export function getOwnInterest(album_mbid){
    return api.get(
        `/albums/${album_mbid}/user_interest/`
    );
}

export function changeOwnInterest(album_mbid, value){
    return api.put(
        `/albums/${album_mbid}/user_interest/`, {
            value: value
        });
}

