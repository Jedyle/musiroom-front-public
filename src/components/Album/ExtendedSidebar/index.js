import React from 'react';
import { Link } from 'react-router-dom';

import TrackList from 'components/Album/TrackList';
import AlbumSidebar from 'components/Album/Sidebar';
import { getDiscussionsUrlForObject } from 'pages/urls';
import { CreateDiscussionLink } from 'containers/Links';

const ExtendedSidebar = ({album}) => (
    <>
      <AlbumSidebar
        {...album}
      />
      <span>
        <Link
          to={getDiscussionsUrlForObject('album', album.id)}
          className="button is-medium has-margin-top-5 is-fullwidth is-info">Discussions on {album.title}</Link>

        <CreateDiscussionLink
          className="button is-medium has-margin-top-5 is-fullwidth is-success"
          title="New discussion"
          contentType="album"
          objectId={album.id}
        />
        
      </span>
      <hr/>
      <h3 className="is-size-5">Tracks</h3>
      <TrackList
        tracks={album.mbid ? album.tracks.track_list : []}
      />
    </>
);

export default ExtendedSidebar;
