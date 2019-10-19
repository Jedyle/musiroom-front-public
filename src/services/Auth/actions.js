import {LOGIN, LOGOUT} from './actionTypes';

export const login = (token, user_data) => ({
    type: LOGIN,
    token: token,
    user: user_data
});

export const logout = () => (
    {
        type: LOGOUT
    }
);
