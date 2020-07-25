import React from 'react';
import { DISCUSSION_TYPES } from 'services/Discussions';
import AlbumSidebar from 'components/AlbumDetails/Sidebar';
import ArtistSidebar from 'components/Artist/Sidebar';

const Sidebar = ({
    contentType,
    contentObject
}) => {
    switch(contentType){
    case DISCUSSION_TYPES.album:
        return <AlbumSidebar
                 {...contentObject}
               />;
    case DISCUSSION_TYPES.artist:
        return <ArtistSidebar
                 {...contentObject}
               />;
    default:
        return null;
    }
    
};

export default Sidebar;
