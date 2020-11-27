export const DATA_LOCATION = 'lamusitheque_token';

export function getAuthFromLocalStorage(){
    return JSON.parse(localStorage.getItem(DATA_LOCATION));
}

export function setAuthInLocalStorage(obj){
    localStorage.setItem(DATA_LOCATION, JSON.stringify(obj));
}
