import { createStore, combineReducers } from 'redux';
import authReducer from '../services/Auth/reducers';

const store = createStore(
    combineReducers({
        auth: authReducer
    })
);

export default store;
