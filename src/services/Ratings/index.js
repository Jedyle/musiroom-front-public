import { api } from 'services/axios';

export function getSelfRatings(ratings_ids){
    return api.get(
      `/ratings/self?ids=${ratings_ids.join()}`  
    );
}

export function getSelfInterests(ratings_ids){
    return api.get(
        `/interests/self?ids=${ratings_ids.join()}`
    );
}

export function getFolloweesAverage(ratings_ids){
    return api.get(
      `/ratings/followees?ids=${ratings_ids.join()}`  
    );
}

export function getAlbumRatingStats(rating_id){
    return api.get(
        `/ratings/${rating_id}/stats`
    );
}

export function getFolloweesRatings(rating_id){
    return api.get(
        `/ratings/${rating_id}/followees_ratings`
    );
}
