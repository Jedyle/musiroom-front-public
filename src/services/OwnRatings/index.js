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
export function changeCollection(rating, userRating, callback){
    let newStatus = (userRating && userRating.is_in_collection) ? false : true;
    let call = userRating ? changeUserRating : createUserRating;
    let data = userRating ? {is_interested: userRating.is_interested, is_in_collection: newStatus, score: userRating.score}: {is_interested: false, is_in_collection: newStatus, score: null}

    // when we add sth to collection, automatically disable interested with it
    if (userRating && (userRating.score === null) && (data['is_in_collection'] === true)){
        data["is_interested"] = false;
    }
    // when remove an album from collection, the rating is also removed
    if (userRating && (userRating.score !== null)){
        data["score"] = null;
    }

    let proceed = true;

    if (data.is_interested === false && data.is_in_collection === false && data.score == null) {
        // if, after building, everything is false, then we need to delete the object
        call = deleteUserRating;
        if ((data.is_interested === false) && (userRating && userRating.review)){
            proceed = window.confirm("This will also delete your review ! Proceed ?");
        }
    }

    if (proceed){
        call(rating, data).then((response) => {
            callback(response);
        });
    }
}

export function changeInterest(rating, userRating, callback){
    let newInterest = (userRating && userRating.is_interested) ? false : true;
    let call = userRating ? changeUserRating : createUserRating;
    let data = userRating ? {is_interested: newInterest, is_in_collection: userRating.is_in_collection, score: userRating.score}: {is_interested: newInterest, is_in_collection: false, score: null}

    if (data.is_interested === false && data.is_in_collection === false && data.score == null) {
        // if, after building, everything is false, then we need to delete the object
        call = deleteUserRating;
    }

    call(rating, data).then((response) => {
        callback(response);
    });
}

export function changeRating(rating, userRating, newRating, callback){
    let call = userRating ? changeUserRating : createUserRating;
    let data = userRating ? {is_interested: userRating.is_interested, is_in_collection: true, score: newRating}: {is_interested: false, is_in_collection: true, score: newRating}

    // when we add a rating, automatically disable interested with it
    if (userRating && (userRating.score === null)){
        data["is_interested"] = false;
    }
    call(rating, data).then((response) => {
        callback(response);    });
}

export function deleteRating(rating, userRating, callback){
    let data = {is_interested: userRating.is_interested, is_in_collection: true, score:null}
    let proceed = true;
    if (userRating && userRating.review){
        proceed = window.confirm("This will also delete your review ! Proceed ?");
    }

    if (proceed){
        changeUserRating(rating, data).then((response) => {
            callback(response)
        });
    }
}

