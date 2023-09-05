import React from 'react';
import SwitchLogButton from 'containers/LoginFilters/SwitchLogButton';

const BaseVoteButton = ({upOrDown, userVote, numVotes, buttonColor, onVote, children}) => (
    <button className={`button ${userVote === upOrDown && buttonColor}`}
            disabled={userVote === upOrDown}
            onClick={onVote}
    >
      {children}
    </button>
);

const VoteButton = (props) => (
    <SwitchLogButton
      userRendering={props => <BaseVoteButton {...props}/>}
      anonymousChildren={props.children}
      {...props}
    />
);

const UpVoteButton = ({userVote, numVotes, onVote}) => (
    <VoteButton
      userVote={userVote}
      onVote={onVote}
      upOrDown={"up"}
      buttonColor="is-success"
    >
      <span className="icon is-small">
        <i className="fa fa-plus"></i>
      </span>
      <small>({numVotes})</small>
    </VoteButton>
);

const DownVoteButton = ({userVote, numVotes, onVote}) => (
    <VoteButton
      userVote={userVote}
      onVote={onVote}
      upOrDown={"down"}
      buttonColor="is-danger"
    >
      <span className="icon is-small">
        <i className="fa fa-minus"></i>
      </span>
      <small>({numVotes})</small>
    </VoteButton>
);

const CancelVoteButton = ({userVote, onVote}) => (
    <VoteButton
      userVote={userVote}
      onVote={onVote}
      upOrDown={null}
      disabled={true}
    >
      Cancel
    </VoteButton>
);

const VoteAlbumGenre = ({genres, onVote}) => (
    <div>
      <p className="title">Genres</p>
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical">
          {genres.map((genre, index) => (
              <div className="tile is-child notification is-grey" key={index}>
                <p className="title is-6 is-marginless">
                  {genre.genre_details.name}
                </p>
                <p>Score: {genre.vote_score}</p>
                <p className="buttons">
                  <UpVoteButton
                    userVote={genre.user_vote}
                    numVotes={genre.num_vote_up}
                    onVote={() => onVote(index, genre.genre_details.slug, "up")}
                  />
                  <DownVoteButton
                    userVote={genre.user_vote}
                    numVotes={genre.num_vote_down}
                    onVote={() => onVote(index, genre.genre_details.slug, "down")}
                  />
                  <CancelVoteButton
                    userVote={genre.user_vote}
                    onVote={() => onVote(index, genre.genre_details.slug, "null")}
                  />
                  {/* <button className="button"> */}
                  {/*   Signaler */}
                  {/* </button> */}
                </p>
              </div>
          ))}
        </div>
      </div>
    </div>
);

export default VoteAlbumGenre;
