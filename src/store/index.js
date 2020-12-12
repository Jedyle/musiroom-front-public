import { createStore, combineReducers } from 'redux';
import authReducer from 'services/Auth/reducers';
import conversationsReducer from 'services/Conversations/reducers';

const store = createStore(
    combineReducers({
        auth: authReducer,
        conversations: conversationsReducer
    })
);

export function getCurrentUserName(){
    return store.getState().auth.user.username;
}

export default store;
