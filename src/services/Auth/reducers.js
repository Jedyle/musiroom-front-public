import * as types from './actionTypes';

import { getAuthFromLocalStorage } from './constants';

export default function authReducer(state = getAuthFromLocalStorage(), action){
    switch(action.type){
    case types.LOGIN:
        return Object.assign({}, state, {
            token: action.token,
            user: action.user
        });
    case types.LOGOUT:
        return {};
    case types.TOGGLE_LOGIN_MODAL:
        return Object.assign({}, state, {
            loginModalIsActive: action.loginModalIsActive
        });
    default:
        return state ? state : {};
    }
};
