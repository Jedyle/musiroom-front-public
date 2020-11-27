import React from 'react';
import { openLoginModal } from 'services/Auth/api';
import LoginPlaceholder from 'components/Utils/LoginFilters/Placeholder';

const BaseVoteArrow = ({upOrDown, textColor, userVote, onVote, children}) => (
    <span className={`icon ${userVote === upOrDown && textColor}`}
          onClick={onVote}
          style={{cursor:'pointer'}}
    >
      {children}
    </span>
);

const VoteArrow = (props) => (
    <LoginPlaceholder
      userRendering={props => <BaseVoteArrow {...props}/>}
      anonymousRendering={props => <BaseVoteArrow {...props} onVote={openLoginModal}/>}
      {...props}
    />
)

const UpVoteArrow = ({userVote, onVote}) => (
    <VoteArrow
      upOrDown="up"
      textColor="has-text-success"
      userVote={userVote}
      onVote={() => onVote("up")}
    >
      <i className="fa fa-angle-up fa-lg"></i>
    </VoteArrow>
);

const DownVoteArrow = ({userVote, onVote}) => (
    <VoteArrow
      upOrDown="down"
      textColor="has-text-danger"
      userVote={userVote}
      onVote={() => onVote("down")}
    >
      <i className="fa fa-angle-down fa-lg"></i>
    </VoteArrow>
);

const VotePanel = ({
    numVotes,
    loggedUserVote,
    onVote
}) => (
    <div className="has-padding-top-5">
      <p className="has-text-centered">
        <UpVoteArrow
          userVote={loggedUserVote}
          onVote={onVote}
        />
        <h5 className="is-size-5 is-marginless">{numVotes}</h5>
        <DownVoteArrow
          userVote={loggedUserVote}
          onVote={onVote}
        />
      </p>
    </div>  
);

export default VotePanel;
