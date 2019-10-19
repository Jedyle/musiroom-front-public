import * as types from './actionTypes';

export default function authReducer(state = {}, action){
    switch(action.type){
    case types.LOGIN:
        return Object.assign({}, state, {
            token: action.token,
            user: action.user
        });
    case types.LOGOUT:
        return {};
    default:
        return {};
    }
};
