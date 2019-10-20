import axios from 'axios';
import { getToken } from 'services/Auth/api';

const defaultOptions = {
    baseURL : `${process.env.REACT_APP_API_URL}/api`,
    headers : {
        'Content-Type': 'application/json'
    }
};

const makeAuthHeader = (token) => `Token ${token}`;

let api = axios.create(defaultOptions);

api.interceptors.request.use(function (config) {
    let token = getToken();
    if (token){
        config.headers.Authorization =  makeAuthHeader(token);
    }
    return config;
});

export {api, makeAuthHeader};
