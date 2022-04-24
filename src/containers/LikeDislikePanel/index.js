import React from 'react';
import SwitchLogButton from 'containers/LoginFilters/SwitchLogButton';

const BaseOpinionButtonContent = ({icon, numVote = 0}) => (
    <>
      <span className="icon">
        <i className={`fa fa-lg ${icon}`}></i>
      </span>
      <span>
        <small>
          | {numVote}
        </small>            
      </span>
    </>
);

const BaseOpinionButton = ({opinion, icon, buttonColor = 'is-info', numVote = 0, onToggleVote = () => {}, loggedUserVote = null}) => (
    <button
      className={`button pr-2 ${buttonColor} ${loggedUserVote === opinion || "is-outlined"}`}
      onClick={onToggleVote}
    >
      <BaseOpinionButtonContent
        icon={icon}
        numVote={numVote}
      />
    </button>
);

const OpinionButton = (props) => (
    <SwitchLogButton
      {...props}
      userRendering={props => (
          <BaseOpinionButton {...props}/>
      )}
      anonymousChildren={<BaseOpinionButtonContent icon={props.icon} numVote={0}/>}
    />
);

const LikeButton = ({numVoteUp, onToggleVoteUp, loggedUserVote}) => (
    <OpinionButton
      className="button pr-2 is-info is-outlined"
      opinion="up"
      icon="fa-thumbs-up"
      buttonColor="is-info"
      numVote={numVoteUp}
      onToggleVote={onToggleVoteUp}
      loggedUserVote={loggedUserVote}
    />
);

const DislikeButton = ({numVoteDown, onToggleVoteDown, loggedUserVote}) => (
    <OpinionButton
      className="button pr-2 is-danger is-outlined"
      opinion="down"
      icon="fa-thumbs-down"
      buttonColor="is-danger"
      numVote={numVoteDown}
      onToggleVote={onToggleVoteDown}
      loggedUserVote={loggedUserVote}
    />
);

const Base = ({
    numVoteUp,
    onToggleVoteUp,
    numVoteDown,
    onToggleVoteDown,
    loggedUserVote
}) => (
    <p className="buttons is-pulled-right">
      <LikeButton
        numVoteUp={numVoteUp}
        onToggleVoteUp={onToggleVoteUp}
        loggedUserVote={loggedUserVote}
      />
      <DislikeButton
        numVoteDown={numVoteDown}
        onToggleVoteDown={onToggleVoteDown}
        loggedUserVote={loggedUserVote}
      />
    </p>
);

export default Base;
