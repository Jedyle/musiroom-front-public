import { createStore, combineReducers } from 'redux';
import authReducer from '../services/Auth/reducers';

const store = createStore(
    combineReducers({
        auth: authReducer
    })
);

export function getCurrentUserName(){
    return store.getState().auth.user.username;
}

export default store;
