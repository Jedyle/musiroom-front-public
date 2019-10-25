import { api } from 'services/axios';

export function getSelfRatings(ratings_ids){
    return api.get(
      `/ratings/self?ids=${ratings_ids.join()}`  
    );
}


export function getFolloweesAverage(ratings_ids){
    return api.get(
      `/ratings/followees?ids=${ratings_ids.join()}`  
    );
}
