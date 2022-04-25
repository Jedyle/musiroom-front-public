import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroller";
import { UserLink } from 'containers/Links';
import { getConversationUrl } from 'pages/urls';
import { getUser } from 'services/Auth/api';
import { listConversations } from 'services/Conversations';
import { fetchConversations } from 'services/Conversations/actions';
import { connect } from 'react-redux';

class ConversationsList extends Component {

    fetchConversationsAPI = (page) => {
        listConversations({page:page}).then((response) => {
            this.props.fetchConversations(response.data.results, response.data.next !== null);
        }).catch((error) => {
            if (error.response.status === 404){
                this.props.fetchConversations([], false);
            }
        });
    }

    isConversationClosed = (conversation) => (!conversation.members.filter(member => member.is_active).map(member => member.user).includes(getUser()))
    isConversationUnread = (conversation) => (conversation.members.find(member => (member.is_active && member.user === getUser())).unread === true)
    isCurrentConversation = (conversation) => (parseInt(this.props.highlightedConv) === parseInt(conversation.id))
    
    render() {
        let { hasMore, conversations } = this.props;
        return (
            <div className="columns is-mobile is-multiline">
              <div className="column is-12">

                <br/>
                
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.fetchConversationsAPI}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                >
                  <div className="list">
                    <div className="list-item has-background-light">
                      <div className="columns is-mobile">
                        <div className="column">
                          <h1 className="title is-5 has-text-centered">Conversations</h1>
                        </div>
                      </div>
                    </div>

                    {conversations.map((conv) => {
                        let otherUsers = conv.members.filter(user => user.user !== getUser()).map(member => member.user);

                        let membersToDisplay = (
                            <>
                              {
                                  otherUsers.slice(0, 2).map((username) => (
                                      <UserLink username={username}/>
                                  )).reduce((prev, curr) => [prev, ', ', curr])
                              }
                              {
                                  otherUsers.length > 2 && ` et ${otherUsers.length - 2} other(s)`
                              }
                            </>
                        );
                        
                        return (
                            <div className={`list-item ${this.isCurrentConversation(conv) && "has-background-success-light"}`} key={conv.id}>
                              <div className="columns is-mobile">
                                <div className="column">
                                  <Link
                                    to={getConversationUrl(conv.id)}>{conv.title}</Link>
                                  <small className="is-hidden-mobile">
                                    {" "}
                                    ({membersToDisplay})
                                  </small>
                                  <p className="is-pulled-right">
                                    <span className="icon">                                    
                                      {
                                          this.isConversationClosed(conv) ?
                                              <i className="fa fa-lock"></i> : (
                                                  this.isConversationUnread(conv) ?
                                                      <i className="fa fa-envelope"></i> :
                                                  <i className="fa fa-check"/>
                                              )
                                      }                                                                                                 
                                    </span>
                                    {" "}

                                  </p>
                                </div>
                              </div>
                            </div>
                        );
                    })}
                  </div>
                </InfiniteScroll>
                
              </div>              
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.conversations.page,
        conversations: state.conversations.conversations,
        hasMore: state.conversations.hasMore,
        highlightedConv: state.conversations.highlighted
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchConversations: (conversations, hasMore) => dispatch(fetchConversations(conversations, hasMore))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList);
