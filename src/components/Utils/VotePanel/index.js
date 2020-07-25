import React from 'react';

const VotePanel = ({
    numVotes,
    loggedUserVote,
    onVote
}) => (
    <div className="has-padding-top-5">
      <p className="has-text-centered">
        <span className={`icon ${loggedUserVote === 'up' ? 'has-text-success' : ''}`}
              onClick={() => onVote('up')}
              style={{cursor:'pointer'}}
        >
          <i className="fa fa-angle-up fa-lg"></i>
        </span>
        <h5 className="is-size-5 is-marginless">{numVotes}</h5>
        <span className={`icon ${loggedUserVote === 'down' ? 'has-text-danger' : ''}`}
              onClick={() => onVote('down')}
              style={{cursor:'pointer'}}
        >
          <i className="fa fa-angle-down fa-lg"></i>
        </span>
      </p>
    </div>  
);

export default VotePanel;
