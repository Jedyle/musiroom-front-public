import React from 'react';
import { Link } from 'react-router-dom';
import { profileUrl, createGenreUrl, discussionCreateOnTopicUrl, discussionCreateUrl, getDiscussionUrl, getAlbumUrl, getReviewUrl } from 'pages/urls';
import SwitchLogButton from 'components/Utils/LoginFilters/SwitchLogButton';


export const CreateGenreLink = ({title, ...props}) => (
    <SwitchLogButton
      userRendering={(props) => (
          <Link {...props} to={createGenreUrl()}>{title}</Link>
      )}
      anonymousChildren={title}
      {...props}
    />       
);


export const CreateDiscussionLink = ({title, contentType=null, objectId=null, ...props}) => (
    <SwitchLogButton
      className="button is-medium has-margin-top-5 is-fullwidth is-success"
      userRendering={(props) => (
          <Link
            {...props}
            to={contentType ? discussionCreateOnTopicUrl(contentType, objectId) : discussionCreateUrl()}                
          >
            {title}
          </Link>
      )}
      anonymousChildren={title}
      {...props}
    />       
);


export const UserLink = ({username}) => (
    <Link to={profileUrl(username)}>{username}</Link>
);


export const GetAlbumLink = ({title, mbid}) => (
    <Link to={getAlbumUrl(mbid)}>{title}</Link>
);


export const GetDiscussionLink = ({id, name}) => (
    <Link to={getDiscussionUrl(id)}>{name}</Link>
);

export const GetReviewLink = ({albumId, reviewId, title}) => (
    <Link to={getReviewUrl(albumId, reviewId)}>{title}</Link>
)
