import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeadLine from 'components/Utils/HeadLine';
import { getUser } from 'services/Auth/api';
import { getConversation, updateConversation, getMessages, createMessage } from 'services/Conversations';
import { storeUpdateConversation, highlightConversation } from 'services/Conversations/actions';
import Conversation from './conversation';
import ConvUsers from './convUsers';
import MessageForm from 'components/Utils/Forms/MessageForm';
import Title from 'components/Utils/Title';

import './index.css';


class ConversationRetrieve extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            hasMore: true,
            isLoading: false,
            newMessage: '',
            editConversationError: {}
        };
    }

    componentDidMount(){
        this.props.highlightConversation();
    }

    fetchMessages = (page) => {
        let { id } = this.props;
        this.setState({isLoading: true});
        getMessages(id, {page: page}).then((response) => {          
            this.setState((prevState) => {
                return {
                    messages: prevState.messages.concat(response.data.results),
                    hasMore: response.data.next !== null,
                    isLoading: false
                };                
            });
            // This is a dirty hack
            // We fetch the conversation after having fetched the first page, so that we get the new reading status (unread=false) in the store.
            if (page === 1){
                getConversation(id).then((response) => {
                    this.props.updateConversation(response.data);
                });
            }
        });
    }

    onSubmitMessage = (e) => {
        e.preventDefault();
        let { id } = this.props;
        let { newMessage } = this.state;
        createMessage(id, newMessage).then((response) => {
            this.setState((prevState) => {
                return {
                    messages: [response.data].concat(prevState.messages),
                    newMessage: ''
                };
            });
        });
    }

    activeMembers = (members) => (members.filter((member) => member.is_active))

    onChangeMembers = (members) => {
        let conversation = Object.assign({}, this.props.conversation);
        conversation.members = members;
        updateConversation(conversation.id, conversation).then((response) => {
            this.props.updateConversation(response.data);
            this.setState({
                editConversationError: {}
            });
        }).catch((error) => {        
            if (error.response.status === 400){
                this.setState((prevState) => ({
                    editConversationError: error.response.data
                }));
            }
        });
    }

    isActiveUser = () => (this.activeMembers(this.props.conversation.members).map(m => m.user).includes(getUser()))
    
    render() {
        let { conversation } = this.props;
        let { messages, hasMore, isLoading, newMessage, editConversationError } = this.state;
        return (conversation ?
                <div className="columns is-mobile is-multiline">
                  <Title title={`${conversation.title} - Message Box`}/>
                  <div className="column is-12">
                    <HeadLine
                      title={conversation.title}
                      titleClasses="has-text-white"
                      heroClasses="has-background-success"
                    />
                    <p className="help is-danger">{!this.isActiveUser() && "You are not in this conversation"}</p>
                    <ConvUsers                 
                      members={this.activeMembers(conversation.members)}
                      onChangeMembers={this.onChangeMembers}
                    />
                    <p className="help">{editConversationError.users}</p>

                    <br/>                
                    <Conversation
                      messages={messages}
                      loadMore={this.fetchMessages}
                      hasMore={hasMore}
                      isLoading={isLoading}
                      loader={<div><p className="has-text-centered">Loading...</p></div>}
                    />

                    {this.isActiveUser() &&
                     <MessageForm
                       content={newMessage}
                       onChange={(e) => this.setState({newMessage: e.target.value})}
                       messagePlaceholder="Your message"
                       buttonClasses="is-info"
                       onSubmit={this.onSubmitMessage}
                     />
                    }
                  </div>              
                </div> : <div></div>
               );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        conversation: state.conversations.conversations.find(conv => parseInt(conv.id) === parseInt(ownProps.id))
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateConversation: (conversation) => dispatch(storeUpdateConversation(ownProps.id, conversation)),
    highlightConversation: () => dispatch(highlightConversation(ownProps.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationRetrieve);
