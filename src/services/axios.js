import axios from 'axios';
import store from 'store';

const defaultOptions = {
    baseURL : "http://localhost:8000/api",
    headers : {
        'Content-Type': 'application/json'
    }
};

const makeAuthHeader = (token) => `Token ${token}`;

let api = axios.create(defaultOptions);

api.interceptors.request.use(function (config) {
    const token = store.getState().auth.token;
    if (token){
        config.headers.Authorization =  makeAuthHeader(token);
    }
    return config;
});

export {api, makeAuthHeader};
