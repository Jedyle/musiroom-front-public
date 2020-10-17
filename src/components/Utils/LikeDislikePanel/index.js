import React from 'react';

const LikeDislikePanel = ({
    numVoteUp,
    onToggleVoteUp,
    numVoteDown,
    onToggleVoteDown,
    loggedUserVote
}) => (
    <p className="buttons is-pulled-right">
      <button
        className={"button is-info pr-2 " + (loggedUserVote === "up" || "is-outlined")}
        onClick={onToggleVoteUp}
      >
        <span className="icon">
          <i className="fa fa-lg fa-thumbs-up"></i>
        </span>
        <span>
          <small>
            | {numVoteUp}
          </small>            
        </span>
      </button>
      <button
        className={"button is-danger pr-2 " + (loggedUserVote === "down" || "is-outlined")}
        onClick={onToggleVoteDown}
      >
        <span className="icon">
          <i className="fa fa-lg fa-thumbs-down"></i>
        </span>
        <span>
          <small>
            | {numVoteDown}
          </small>
        </span>
      </button>        
    </p>
);

export default LikeDislikePanel;
