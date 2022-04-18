export const profileUrl = (username) => `/account/u/${username}`;
export const changeProfileUrl = () => "/account/change";
export const discussionsUrl = () => "/discussions";
export const discussionCreateUrl = () => "/discussions/new";
export const discussionCreateOnTopicUrl = (contentType, objectId) => `/discussions/new?model=${contentType}&objectId=${objectId}`;
export const getAlbumUrl = (id) => `/music/album/${id}`;
export const getAlbumGenresUrl = (id) => `${getAlbumUrl(id)}/genres`;
export const createReviewUrl = (id) => `${getAlbumUrl(id)}/review`;
export const getReviewUrl = (albumId, reviewId) => `/music/album/${albumId}/review/${reviewId}`;
export const getArtistUrl = (id) => `/music/artist/${id}`;
export const getGenreUrl = (slug) => `/music/genre/${slug}`;
export const getGenresUrl = () => `/music/genres`;
export const createGenreUrl = () => '/music/genres/new';
export function getDiscussionsUrlForObject(contentType, contentObjectId){
    switch(contentType){
    case "artist":
        return `${getArtistUrl(contentObjectId)}/discussions`;
    case "album":
        return `${getAlbumUrl(contentObjectId)}/discussions`;
    case null:
        return "/discussions/general";
    default:
        return "";
    }
}

export const getDiscussionUrl = (discussionId) => `/discussions/d/${discussionId}`;
export const getSearchUrl = () => `/search`;
export const getNotificationsUrl = () => '/account/notifications';

export const listListsUrl = () => `/lists`;
export const createListUrl = () => `/lists/new`;
export const getListUrl = (id) => `/lists/detail/${id}`;

export const getTopUrl = (genre = "all", period = "all") => `/tops/${genre}/${period}`;

export const getRegistrationUrl = () => `/register`;
export const activationLinkSentUrl = () => `/register/done`;
export const activateAccountUrl = () => `/confirm`;

export const getAllActivityUrl = () => `/live/all`;
export const getSelfActivityUrl = () => `/live/personal`;

export const createExportUrl = () => `/export/create`;
export const exportTaskLaunchedUrl = () => `/export/ok`;
export const listExportsUrl = () => `/profil/exports`;
export const getExportUrl = (id) => `/profil/exports/${id}`;

export const listConversationsUrl = () => `/account/messages`;
export const getConversationUrl = (id) => `/account/messages/${id}`;
