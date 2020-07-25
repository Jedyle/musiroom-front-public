import React from 'react';
import { Link } from 'react-router-dom';
import VotePanel from 'components/Utils/VotePanel';


const DiscussionHeader = ({
    avatar,
    author,
    link,
    timeSincePost,
    discussionType,
    discussionTypeLink
}) => (
    <div className="is-marginless has-margin-top-5 columns">      
      <div className="has-margin-left-10">
        <Link to={link}>
          <figure className="image is-24x24" style={{display: "inline-block"}}>
            <img className="is-rounded" src={avatar} />
          </figure>
        </Link>
      </div>
      <div className="column is-paddingless has-margin-left-10">
        <Link to={link} >{author}</Link>
        <span className="has-padding-left-5 has-text-weight-light">
          <small>{timeSincePost}</small>
        </span>
      </div>
      { discussionType &&
        <div className="is-pulled-right has-padding-right-20">
          <Link to={discussionTypeLink}>{discussionType}</Link>
        </div>
      }
    </div>  
);

const CommentPanel = ({
    numComments
}) => (
    <div className="has-background-light" style={{minWidth: '45px'}}>
      <p className="has-padding-top-10 has-text-centered"> 
        <span className="icon">
          <i className="fa fa-comment fa-lg"></i>
        </span>
        <h5 className="is-size-6">{numComments}</h5>
      </p>
    </div>  
);

const DiscussionListItem = ({
    numVotes,
    loggedUserVote,
    onVote,
    avatar,
    author,
    authorLink,
    timeSincePost,
    discussionType,
    discussionTypeLink,
    discussionLink,
    title,
    numComments
}) => (
    <div className="columns is-mobile is-marginless has-border" style={{borderColor: 'rgba(0,0,0,.125)'}}>
      <div style={{minWidth: '45px'}}>
        <VotePanel
          numVotes={numVotes}
          loggedUserVote={loggedUserVote}
          onVote={onVote}
        />
      </div>
      <div className="column is-marginless is-paddingless">
        <DiscussionHeader
          avatar={avatar}
          author={author}
          link={authorLink}
          timeSincePost={timeSincePost}
          discussionType={discussionType}
          discussionTypeLink={discussionTypeLink}
        />
        <hr className="is-marginless" />
        <h1 className="title is-size-4 has-margin-15">
          <Link to={discussionLink}>{title}</Link>          
        </h1>
      </div>
      <CommentPanel
        numComments={numComments}
      />
    </div>
);

export default DiscussionListItem;
