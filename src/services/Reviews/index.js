import { api } from 'services/axios';

export function getReviewsForUserRatings(username, ratings_ids){
    return api.get(
        `/users/${username}/reviews?rating_id__in=${ratings_ids.join()}`
    );
}
