import { api, makeAuthHeader } from '../axios';
import store from 'store';
import * as actions from './actions';

const DATA_LOCATION = 'lamusitheque_token';

export function getAuthFromLocalStorage(){
    return JSON.parse(localStorage.getItem(DATA_LOCATION));
}

export function setAuthInLocalStorage(obj){
    localStorage.setItem(DATA_LOCATION, JSON.stringify(obj));
}

export function getUser(){
    let storage = getAuthFromLocalStorage(); 
    return storage ? storage.user.username : null;
}

export function getToken(){
    let storage = getAuthFromLocalStorage(); 
    return storage ? storage.token : null;
}

export {DATA_LOCATION};


export function login(username, password){
    let loginPromise = api.post('/auth/login/', {
        username: "Tester",
        password: "testmdp4"
    });

    let userDataPromise = loginPromise.then((login_response) => {
        store.dispatch(actions.login(
            login_response.data.key         
        ));
        return api.request(
            {
                url: 'auth/user',
                headers: {
                    Authorization: makeAuthHeader(login_response.data.key)
                }
            });
    });

    Promise.all([loginPromise, userDataPromise]).then((responses) => {
        let login_response = responses[0];
        let user_response = responses[1];
        store.dispatch(actions.login(login_response.data.key, user_response.data));
        setAuthInLocalStorage({
            token: login_response.data.key,
            user: user_response.data
        });
    });
};

export function changeUserProfile(newUser){
    return api.put(`/auth/user/`, newUser);
}

export function changePassword(data){
    return api.post(`/auth/password/change/`, data);
}

export function changeAvatar(file){
    let form = new FormData();
    form.append('avatar', file);
    return api.put(`/auth/user/avatar`, form, {        
        'Content-Type': 'multipart/form-data'
    });
}

export function updateProfileInLocalStorage(newData){
    store.dispatch(actions.login(getToken(), newData));
    setAuthInLocalStorage({
        token: getToken(),
        user: newData
    });
}

export function logout(){
    store.dispatch(actions.logout());
    localStorage.removeItem(DATA_LOCATION);
}
