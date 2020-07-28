import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from 'services/Auth/api';
import { getDiscussion, getDiscussionObjectName, voteOnDiscussion, editDiscussion } from 'services/Discussions';
import { getDiscussionUrl, discussionsUrl, getDiscussionsUrlForObject, profileUrl } from 'pages/urls';
import { timeSince } from 'utils/date';
import VotePanel from 'components/Utils/VotePanel';
import DiscussionSidebar from 'components/Discussions/Sidebar';
import CommentSection from 'components/Comments/Section';
import DiscussionEditForm from 'components/Discussions/EditForm';


export default class DiscussionRetrieve extends Component {

    constructor(props){
        super(props);
        this.state = {
            discussion: {
                title: '...',
                content: '...'
            },
            hasEditForm: false,
            discussionEdit: {
                title: '',
                content: ''
            },
            
            nonFieldErrors: [],
            titleErrors: [],
            contentErrors: []
        };
        this.onVote = this.onVote.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onEditDiscussion = this.onEditDiscussion.bind(this);
    }

    componentDidMount(){
        getDiscussion(this.props.match.params.discussionId).then((response) => {
            this.setState({
                discussion: response.data,
                discussionEdit: response.data
            });
        });
    }

    onChange(event, field){
        let discussionEdit = Object.assign({}, this.state.discussionEdit);
        discussionEdit[field] = event.target.value;
        this.setState({
            discussionEdit: discussionEdit
        });
    }

    onEditDiscussion(event){
        editDiscussion(
            this.state.discussion.id,
            this.state.discussionEdit.title,
            this.state.discussionEdit.content,            
        ).then((response) => {
            this.setState({
                discussion: response.data,
                discussionEdit: response.data,
                hasEditForm: false
            });
        }).catch((error) => {
            if (error.response.status === 400){
                this.setState({
                    nonFieldErrors: error.response.data.non_field_errors,
                    titleErrors: error.response.data.title,
                    textErrors: error.response.data.content
                });
            }

        });
    }
    
    onVote(vote){
        voteOnDiscussion(this.state.discussion.id, vote).then(
            (response) => {
                this.setState({
                    discussion: response.data,
                    discussionEdit: response.data
                });
            }
        );
    }
    
    render() {
        let discussion = this.state.discussion;
        return (
            <div className="columns is-mobile is-multiline">
              <div className="column is-12 has-background-light">
                <h1 className="title has-text-centered has-padding-10">
                  <Link to={discussionsUrl()}>Discussions</Link>
                  {" >"} <Link to={getDiscussionsUrlForObject(this.state.discussion.content_type, this.state.discussion.object_id)}>{getDiscussionObjectName(discussion) || "..."}</Link> {"> "}
                  <Link to={getDiscussionUrl(discussion.id)}>
                    {discussion.title}
                  </Link>                  
                </h1>
              </div>
              <div className="column is-12-mobile is-2-tablet has-margin-left-5">
                <DiscussionSidebar
                  contentType={discussion.content_type}
                  contentObject={discussion.content_object}
                />
              </div>
              <div className="column is-12-mobile is-7-tablet">

                <div className="box">                  
                  <div className="columns">
                    <div className="column is-narrow is-marginless is-paddingless" style={{width: "40px"}}>
                      <VotePanel
                        numVotes={discussion.vote_score}
                        loggedUserVote={discussion.user_vote}
                        onVote={this.onVote}
                      />
                    </div>
                    <div className="column">
                      { discussion.user && 
                        <div className="columns">
                          <div className="has-margin-left-10">
                          <Link to="">
                            <figure className="image is-24x24" style={{display: "inline-block"}}>
                              <img className="is-rounded" src={process.env.REACT_APP_API_URL + discussion.user.avatar} />
                            </figure>
                          </Link>
                          </div>
                          <div className="column is-paddingless has-margin-left-10">
                            <Link to={profileUrl(discussion.user.username)} >{discussion.user.username}</Link>
                            <span className="has-padding-left-5 has-text-weight-light">
                              <small>{timeSince(discussion.created)}</small>
                            </span>
                            { getUser() === discussion.user.username && (
                                <span className="is-pulled-right"
                                      style={{cursor: 'pointer'}}
                                      onClick={(e) => {this.setState((prevState) => ({hasEditForm: !prevState.hasEditForm}));}}
                                >
                                  <i title="Editer" className="fa fa-lg fa-edit mr-10"></i>
                                </span>  
                            )}
                          </div>
                        </div>
                      }
                      <hr className="is-marginless"/>
                      <br/>
                      {this.state.hasEditForm ?
                       <DiscussionEditForm

                         nonFieldErrors={this.state.nonFieldErrors}

                         title={this.state.discussionEdit.title}
                         onChangeTitle={(e) => this.onChange(e, 'title')}
                         titleErrors={this.state.titleErrors}
                         
                         content={this.state.discussionEdit.content}
                         onChangeContent={(e) => this.onChange(e, 'content')}
                         contentErrors={this.state.contentErrors}

                         onSubmit={this.onEditDiscussion}
                         onCancel={() => {this.setState({hasEditForm: false});}}       
                         
                       /> : (
                           <>
                             <h1 className="title is-size-4">{discussion.title}</h1>
                             <p>
                               {discussion.content}
                             </p>
                           </>
                       )
                      }
                    </div>
                  </div>
                </div>

                <hr/>
                
                {discussion.id &&
                 <CommentSection
                   contentType="discussion"
                   objectId={discussion.id}                   
                   hash={this.props.location.hash}
                 />
                }
                
              </div>
            </div>
        );
    }
}
