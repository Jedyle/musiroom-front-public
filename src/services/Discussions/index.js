export function getDiscussionType(discussion){
    switch (discussion.content_type){
    case null:
        return "discussion générale";
    case "album":
        return `sur ${discussion.content_object.title}`;
    case "artist":
        return `sur ${discussion.content_object.name}`;
    default:
        return '';
    }
}

export function getDiscussionLinkForContentType(content_type){
    switch(content_type){
    case "artist":
        return "";
    case "album":
        return "";
    case null:
        return "";
    default:
        return "";
    }
}

export function getDiscussionLink(discussion){
    return "/";
}
