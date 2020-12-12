import { FETCH_CONVERSATIONS, UPDATE_CONVERSATION, HIGHLIGHT_CONVERSATION } from './actionTypes';

export const fetchConversations = (conversations, hasMore) => ({
    type: FETCH_CONVERSATIONS,
    conversations: conversations,
    hasMore: hasMore
});

export const storeUpdateConversation = (id, conversation) => ({
    type: UPDATE_CONVERSATION,
    convId: id,
    conversation: conversation,
});

export const highlightConversation = (id) => ({
    type: HIGHLIGHT_CONVERSATION,
    convId: id
});
