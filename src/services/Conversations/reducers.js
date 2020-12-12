import * as types from './actionTypes';

const INIT_STATE = {
    conversations: [],
    page: 0,
    hasMore: true,
    highlighted: null
};

export default function conversationsReducer(state = INIT_STATE, action){
    let conversations;
    switch(action.type){
    case types.FETCH_CONVERSATIONS:
        conversations = state.conversations;
        return Object.assign({}, state, {
            conversations: conversations.concat(action.conversations),
            page: state.page + 1,
            hasMore: action.hasMore
        });
    case types.UPDATE_CONVERSATION:
        conversations = state.conversations.slice();
        let currentIndex = conversations.findIndex(conv => parseInt(conv.id) === parseInt(action.convId));
        conversations[currentIndex] = action.conversation;
        return Object.assign({}, state, {
            conversations: conversations
        });
    case types.HIGHLIGHT_CONVERSATION:
        return Object.assign({}, state, {
            highlighted: action.convId
        });
    default:
        return state;
    }
};
