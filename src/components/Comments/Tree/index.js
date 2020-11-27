import React, { Component } from 'react';
import { profileUrl } from 'pages/urls';
import { Link } from 'react-router-dom';
import { toHumanDate } from 'utils/date';
import { getUser } from 'services/Auth/api';
import VotePanel from 'components/Utils/VotePanel';
import CommentCreateForm from 'components/Comments/CreateForm';
import CommentEditForm from 'components/Comments/EditForm';


class CommentItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            hasReplyForm : false,
            replyContent: "",
            hasEditForm: false,
            editContent: props.comment.comment
        };
        this.onChangeReply = this.onChangeReply.bind(this);
        this.onChangeEdit = this.onChangeEdit.bind(this);
    }

    onChangeReply(e){
        this.setState({
            replyContent: e.target.value
        });
    }

    onChangeEdit(e){
        this.setState({
            editContent: e.target.value
        });
    }

    canUserReply = () => ((this.props.depthLevel < this.props.maxDepth) && getUser())
    
    render() {
        let comment = this.props.comment;
        let commentMap = this.props.commentMap;
        return (
            <div className="columns" id={comment.id}>
              <div className="column is-narrow mt-2" style={{width: "60px"}}>
                <figure className="image is-48x48">
                  <img src={comment.user.profile.avatar}/>
                </figure>        
              </div>
              <div className="column is-narrow is-paddingless" style={{width: "35px"}}>
                <VotePanel
                  numVotes={comment.vote_score}
                  loggedUserVote={comment.user_vote}
                  onVote={(action) => this.props.onCommentVote(comment.id, action)}
                />
              </div>
              <div className="column">
                <div className="columns is-multiline">
                  <div className="column is-full py-0">
                    <p>
                      <Link to={profileUrl(comment.user.username)}>
                        {comment.user.username}
                      </Link>
                      <span className="is-pulled-right">
                        { this.props.isEditable && 
                          <span className="icon"
                                style={{cursor: 'pointer'}}
                                onClick={(e) => {this.setState((prevState) => ({hasEditForm: !prevState.hasEditForm}));}}
                          >
                            <i title="Editer" className="fa fa-lg fa-edit mr-10"></i>
                          </span>
                        }
                        <span className="icon">
                          <i className="fa fa-lg fa-flag mr-10"></i>                        
                        </span>
                        <span className="icon">
                          <i className="fa fa-lg fa-trash"></i>
                        </span>
                      </span>
                    </p>
                  </div>
                  <div className="column is-full">
                    { !this.state.hasEditForm ?
                      (
                          <p>{comment.comment}</p>                    
                      ) :
                      (
                          <CommentEditForm
                            content={this.state.editContent}
                            onChange={this.onChangeEdit}
                            onSubmit={(e) => {
                                this.props.onEditComment(comment.id, this.state.editContent, e);
                                this.setState({hasEditForm: false});
                            }}
                            onCancel={() => {this.setState({hasEditForm: false});}}
                          />
                      )
                    }                    
                    <p>
                      <span className="is-pulled-right is-size-7">{toHumanDate(comment.submit_date)}</span>
                      {
                          this.canUserReply() &&
                              (<Link className="is-size-7" to="#"
                              onClick={(e) => {
                                  e.preventDefault();
                                  this.setState((prevState) => (
                                      {hasReplyForm: !prevState.hasReplyForm}
                                  ));}}
                         >
                           Répondre
                         </Link>)
                      }
                      { this.state.hasReplyForm &&
                        (
                            <CommentCreateForm
                              content={this.state.replyContent}
                              onChangeContent={this.onChangeReply}
                              onSubmitComment={(e) => {
                                  this.props.onSubmitComment(comment.id, this.state.replyContent, e);
                                  this.setState({hasReplyForm: false});
                              }}
                            />
                            
                        )
                      }
                    </p>
                  </div>
                  
                  {
                      commentMap[comment.id].children &&
                          commentMap[comment.id].children.length > 0 &&                           
                          <div className="column is-full">
                            <CommentTreeView
                              rootComments={commentMap[comment.id].children}
                              commentMap={commentMap}
                              onCommentVote={this.props.onCommentVote}
                              onSubmitComment={this.props.onSubmitComment}
                              onEditComment={this.props.onEditComment}
                              depthLevel={this.props.depthLevel + 1}
                              maxDepth={this.props.maxDepth}
                            />
                          </div>
                  }
                </div>
              </div>
            </div>

        );
    }
}

const CommentTreeView = ({commentMap, rootComments, onCommentVote, onSubmitComment, onEditComment, depthLevel, maxDepth}) => (
    rootComments.length > 0 &&
        <div>
          {rootComments.map((commentId) => (
              <React.Fragment
                key={commentId}
              >
                <hr className="mt-0"/>
                <CommentItem
                  comment={commentMap[commentId].data}
                  isEditable={commentMap[commentId].isEditable}
                  commentMap={commentMap}
                  onCommentVote={onCommentVote}
                  onSubmitComment={onSubmitComment}
                  onEditComment={onEditComment}
                  depthLevel={depthLevel}
                  maxDepth={maxDepth}
                />
              </React.Fragment>
          ))}
        </div>
);

export default CommentTreeView;
