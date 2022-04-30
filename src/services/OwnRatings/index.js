import { api } from 'services/axios';

export function getUserRating(rating_id){
    return api.get(
        `/ratings/${rating_id}/self`
    );
}

export function createUserRating(rating_id, data){
    return api.post(
        `/ratings/${rating_id}/user_ratings`, data
    );
}

// changeOwnRating
export function changeUserRating(rating_id, data){
    // data containers score, is_in_collection and is_interested
    return api.put(
        `/ratings/${rating_id}/self`, data
    );
}

export function deleteUserRating(rating_id){
    return api.delete(
        `/ratings/${rating_id}/self`
    );
}

// utility functions to change only a single item (interest, collection, or rating)
// based on api calls above and an already existing (or not) UserRating instance
export function changeInterest(rating, userRating, callback){
    let newInterest = (userRating && userRating.is_interested) ? false : true;
    let call = userRating ? changeUserRating : createUserRating;
    let data = userRating ? {is_interested: newInterest, is_in_collection: userRating.is_in_collection, score: userRating.score}: {is_interested: newInterest, is_in_collection: false, score: null}
    call(rating, data).then((response) => {
        callback(response);
    });        
}

export function changeRating(rating, userRating, newRating, callback){
    let call = userRating ? changeUserRating : createUserRating;
    let data = userRating ? {is_interested: userRating.is_interested, is_in_collection: true, score: newRating}: {is_interested: false, is_in_collection: true, score: newRating}

    // when we add a rating, automatically disable interested with it
    if (userRating && userRating.score === null){
        data["is_interested"] = false;
    }
    call(rating, data).then((response) => {
        callback(response);
    });
}

export function deleteRating(rating, userRating, callback){
    let data = {is_interested: userRating.is_interested, is_in_collection: true, score:null}
    changeUserRating(rating, data).then((response) => {
        callback(response)
    });
}
