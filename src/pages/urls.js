export const profileUrl = (username) => `/profil/u/${username}`;
export const changeProfileUrl = () => "/profil/modifier";
export const discussionsUrl = () => "/discussions";
export const discussionCreateUrl = () => "/discussions/nouvelle";
export const discussionCreateOnTopicUrl = (contentType, objectId) => `/discussions/nouvelle?model=${contentType}&objectId=${objectId}`;
export const getAlbumUrl = (id) => `/musique/album/${id}`;
export const getAlbumGenresUrl = (id) => `${getAlbumUrl(id)}/genres`;
export const createReviewUrl = (id) => `${getAlbumUrl(id)}/critiquer`;
export const getReviewUrl = (albumId, reviewId) => `/musique/album/${albumId}/critique/${reviewId}`;
export const getArtistUrl = (id) => `/musique/artiste/${id}`;
export const getGenreUrl = (slug) => `/musique/genre/${slug}`;
export const getGenresUrl = () => `/musique/genres`;
export const createGenreUrl = () => '/musique/genres/nouveau';
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
export const getSearchUrl = () => `/rechercher`;
export const getNotificationsUrl = () => '/profil/notifications';

export const listListsUrl = () => `/listes`;
export const createListUrl = () => `/listes/nouvelle`;
export const getListUrl = (id) => `/listes/detail/${id}`;

export const getTopUrl = (genre, period) => `/tops/${genre}/${period}`;

export const getRegistrationUrl = () => `/inscription`;
export const activationLinkSentUrl = () => `/inscription/fin`;
export const activateAccountUrl = () => `/confirm`;

export const getAllActivityUrl = () => `/live/tout`;
export const getSelfActivityUrl = () => `/live/perso`;

export const createExportUrl = () => `/export/creer`;
export const exportTaskLaunchedUrl = () => `/export/ok`;
export const listExportsUrl = () => `/profil/exports`;
export const getExportUrl = (id) => `/profile/exports/${id}`;
