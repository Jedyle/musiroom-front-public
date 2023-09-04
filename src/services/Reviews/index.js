import { api } from 'services/axios';

export function getReviewsForUserRatings(username, ratings_ids){
    return api.get(
        `/users/${username}/reviews?rating_id__in=${ratings_ids.join()}`
    );
}

export function getReviewsForRatedObject({
    rating_id,
    title=null,
    ordering='-date_publication',
    page=1,
    limit=5
}){
    let params = {
        rating__rating: rating_id,
        page: page,
        limit: limit,
        ordering: ordering
    };
    if (title){
        params.title__icontains = title;
    }
    return api.get(
        `/reviews`, {
            params: params
        }
    );
}

export function getReview(id){
    return api.get(`/reviews/${id}`);
}

export function voteOnReview(id, vote){
    return api.put(`/reviews/${id}/vote/`, {
        vote: vote
    });
}

export function createReview({rating, title, content}){
    return api.post(`/reviews/`, {
        rating: rating,
        title: title,
        content: content
    });
}

export function updateReview(id, title, content){
    return api.put(`/reviews/${id}/`, {
        title: title,
        content: content
    });
}
