import React, { Component } from 'react';
import queryString from 'query-string';
import { getDiscussions, getDiscussionType, getObjectForDiscussionType, voteOnDiscussion } from 'services/Discussions';
import DiscussionListItem from 'components/Discussions/List/ListItem';
import { timeSince } from 'utils/date';
import { profileUrl, discussionsUrl, getDiscussionUrl, getDiscussionsUrlForObject } from 'pages/urls';
import { Link, withRouter } from 'react-router-dom';
import { CreateDiscussionLink } from 'containers/Links';
import DiscussionSidebar from 'components/Discussions/Sidebar';
import Title from 'components/Utils/Title';

class DiscussionsList extends Component {

    constructor(props){
        super(props);
        let query = queryString.parse(props.location.search);
        this.state = {
            discussions: [],
            objectId: props.objectId,
            model: props.model,
            page: parseInt(query.page) > 0 ? query.page : 1,
            author: query.author || '',
            title: query.title || '',
            ordering: query.ordering || 'modified',
            previousPageExists: false,
            nextPageExists: false,
            contentObject: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.fetchDiscussions();
    }
    
    fetchDiscussions(){        
        getDiscussions({
            page: this.state.page,
            author: this.state.author,            
            title: this.state.title,
            objectId: this.state.objectId,            
            ordering: this.state.ordering,
            model: this.state.model,
        }).then(
            (response) => {
                this.setState({
                    discussions: response.data.results,
                    previousPageExists: response.data.previous,
                    nextPageExists: response.data.next
                });
            }
        );

        if (this.state.objectId > 0){
            getObjectForDiscussionType(this.state.model, this.state.objectId).then((response) => {
                this.setState({
                    contentObject: response.data.object 
                });
                
            });
        }
    }

    onVote(index, discussionId, vote){
        voteOnDiscussion(discussionId, vote).then(
            (response) => {
                let discussions = this.state.discussions.slice();
                discussions[index] = response.data;
                this.setState(
                    {
                        discussions: discussions
                    }
                );
            }
        );
    }

    getTitle(){
        if(this.state.contentObject){
            if (this.state.model === "artist"){
                return `Discussions about ${this.state.contentObject.name}`;               
            }
            else if (this.state.model === "album"){
                return `Discussions about ${this.state.contentObject.title}`;               
            }
        }
        else if (this.state.objectId === 0){
            return 'General Discussions';
        }
        return "Discussions";
    }
    

    formatDiscussions(){        
        return this.state.discussions.map(
            (discussion, index) => {
                return <DiscussionListItem
                         numVotes={discussion.vote_score}
                         loggedUserVote={discussion.user_vote}
                         onVote={(vote) => this.onVote(index, discussion.id, vote)}
                         author={discussion.user.username}
                         authorLink={profileUrl(discussion.user.username)}
                         avatar={process.env.REACT_APP_API_URL + discussion.user.avatar}
                         timeSincePost={timeSince(discussion.modified)}

                         discussionType={!this.state.objectId && getDiscussionType(discussion)}
                         discussionTypeLink={getDiscussionsUrlForObject(discussion.content_type, discussion.object_id)}

                         discussionLink={getDiscussionUrl(discussion.id)}
                         title={discussion.title}
                         numComments={discussion.comment_count}
                       />;
            }  
        );
    }

    getLink(
        page,
        author,
        title,
        ordering
    ){
        let query = `?page=${page}`;
        if (author){
            query += `&author=${author}`;
        }
        if (title){
            query += `&title=${title}`;
        }
        if (ordering) {
            query += `&ordering=${ordering}`;
        }
        
        let url = this.state.objectId ? getDiscussionsUrlForObject(this.state.model, this.state.objectId) : discussionsUrl();
        return url + query;        
    }

    getPaginator(){
        return (
            <span>
              <Link
                className="pagination-previous"
                disabled={!this.state.previousPageExists}
                to={this.getLink(
                    parseInt(this.state.page) - 1,
                    this.state.author,
                    this.state.title,
                    this.state.ordering
                )}
              > {"<"} </Link>
              <Link
                className="pagination-next"
                disabled={!this.state.nextPageExists}
                to={this.getLink(
                    parseInt(this.state.page) + 1,
                    this.state.author,
                    this.state.title,
                    this.state.ordering
                )}
              >{">"}</Link>
            </span>
        );
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.history.push(this.getLink(
            1, this.state.author, this.state.title, this.state.ordering
        ));
    }
    
    getForm(){
        return (
            <form onSubmit={this.handleSubmit}>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input
                        className="input"
                        type="text"
                        name="author"
                        value={this.state.author}
                        onChange={(e) => {this.setState({author: e.target.value});}}
                        placeholder="Auteur"
                      />
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <input
                        className="input"
                        type="text"
                        name="title"
                        placeholder="Titre"
                        value={this.state.title}
                        onChange={(e) => {this.setState({title: e.target.value});}}
                      />
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                  <div className="select">
                    <select
                      onChange={(e) => {this.setState({ordering: e.target.value});}}
                      value={this.state.ordering}
                    >
                      <option value="-modified">Recent</option>
                      <option value="-vote_score" >Most popular</option>
                    </select>
                  </div>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <button
                        className="button is-primary"
                        type="submit">Search</button>
                    </p>
                  </div>
                </div>
              </div>
            </form>
        );
    }
    
    render(){                
        return (
            <div className="columns is-mobile has-padding-10">
              <Title title={this.getTitle()}/>
              <div className="column is-hidden-mobile is-2-tablet has-margin-top-20">
                { this.state.contentObject &&
                  <DiscussionSidebar
                    contentType={this.state.model}
                    contentObject={this.state.contentObject}                  
                />
                }
              </div>
              <div className="column is-12-mobile is-8-tablet has-margin-top-20 has-border"  style={{borderColor: 'rgba(0,0,0,.125)'}}>
                {
                    this.state.objectId !== null && 
                        <p>
                          <Link to={discussionsUrl()}>{"<"} All discussions</Link>
                        </p>
                }
                <h1 className="is-size-2 has-text-centered">{this.getTitle(this.state.contentObject)}</h1>
                <p className="has-text-centered">
                  <CreateDiscussionLink
                    className="button is-success"
                    title="New discussion"
                    contentType={this.state.model}
                    objectId={this.state.objectId}
                  />
                </p>
                <hr/>
                <div className="columns">
                  <div className="column is-12-mobile is-offset-2-tablet is-8-tablet">
                    {this.getForm()}
                  </div>
                </div>
                <br/>
                {this.getPaginator()}
                {this.formatDiscussions()}
              </div>
            </div>
        );        
    }
    
};

export default withRouter(DiscussionsList);
