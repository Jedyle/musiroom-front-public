import { api, makeAuthHeader } from '../axios';
import store from 'store';
import * as actions from './actions';

function login(username, password){
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
    });
};

function logout(){
    store.dispatch(actions.logout());
}

export {login, logout};
