import { LOGIN, LOGOUT, TOGGLE_LOGIN_MODAL } from './actionTypes';

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

export const toggleLoginModal = (loginModalIsActive) => ({
    type: TOGGLE_LOGIN_MODAL,
    loginModalIsActive: loginModalIsActive
});
