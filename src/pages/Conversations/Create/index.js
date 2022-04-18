import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getConversationUrl } from 'pages/urls';
import Input from 'components/Utils/Forms/Input';
import TagsInput from 'react-tagsinput';
import { getProfile } from 'services/Profile';
import { createConversation, createMessage } from 'services/Conversations';

class CreateForm extends Component {

    render(){
        let { title, onChange, members, onChangeMembers, message, errors } = this.props;
        return (
            <div>
              <p className="help is-danger">{errors.non_field_errors}</p>
              <Input placeholder="Titre" name="title" value={title} onChange={(e) => onChange("title", e.target.value)} errorMessages={errors.title}/>
              <TagsInput
                value={members}
                onChange={onChangeMembers}
                maxTags={20}
                tagProps={
                    {
                        className: "tag is-success is-light is-large mr-1",
                        classNameRemove: "delete is-small"
                    }}
                inputProps={
                    {
                        className: 'react-tagsinput-input',
                        placeholder: 'Ajouter un membre',
                        style: {
                            width: 'auto'
                        }
                    }}
              />
              <p className="help is-danger">{errors.members}</p>
              <textarea className="textarea" placeholder="First message" value={message} onChange={(e) => onChange("message", e.target.value)}></textarea>
            </div>
        );
    }    
}

class ConversationCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            newConversation: {
                non_field_errors: [],
                title: '',
                // just a list of names
                members: [],
                message: ''
            },
            errors: {
                title: '',
                members: []
            }
        };
    }

    onChangeForm = (key, value) => {
        let { newConversation } = this.state;
        newConversation[key] = value;
        this.setState({
            newConversation: newConversation
        });
    }

    onChangeMembers = (members) => {
        let currentMembers = this.state.newConversation.members;
        let newMembers = members.filter(member => !currentMembers.includes(member));
        let checkUsersPromises = newMembers.map((member, index) => (
            getProfile(member).catch((err) => {
                err.index = index;
                throw err;
            })
        ));
        Promise.all(checkUsersPromises).then((responses) => {
            let { newConversation } = this.state;
            newConversation.members = members;
            this.setState({
                newConversation: newConversation
            });
        }).catch((error) => {
            if (error.response.status === 404){
                let { errors } = this.state;
                errors.members = [`User ${newMembers[error.index]} does not exist`];
                this.setState({
                    errors: errors
                });
            }
        }) ;
    }

    redirectToNewConversation = (id) => {
        this.setState({
            isActive: false
        });
        this.props.history.push(getConversationUrl(id));
        window.location.reload();
    }

    onSubmitConversation = () => {
        let { newConversation } = this.state;
        let data = {
            title: newConversation.title,
            members: newConversation.members.map(member => ({user: member}))
        };
        createConversation(data).then((resConv) => {
            let convId = resConv.data.id;
            createMessage(resConv.data.id, newConversation.message).then((resMsg) => {
                this.redirectToNewConversation(convId);
            }).catch(error => {
                this.redirectToNewConversation(convId);
            });
        }).catch(error => {
            if (error.response.status === 400){
                console.log(error.response);
                this.setState({
                    errors: error.response.data
                });
            }
        });
    }
    
    render() {
        let { isActive, newConversation, errors } = this.state;
        return (
            <div>
              <br/>
              <button className="button is-fullwidth" onClick={() => {this.setState({isActive: true});}}>New conversation</button>
              <div className={`modal ${isActive && 'is-active'}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                  <header className="modal-card-head">
                    <p className="modal-card-title">New conversation</p>
                    <button className="delete" aria-label="close" onClick={() => {this.setState({isActive: false});}}></button>
                  </header>
                  <section className="modal-card-body">
                    <CreateForm
                      title={newConversation.title}
                      members={newConversation.members}
                      message={newConversation.message}
                      onChange={this.onChangeForm}
                      onChangeMembers={this.onChangeMembers}
                      errors={errors}
                    />
                  </section>
                  <footer className="modal-card-foot">
                    <button className="button is-success" onClick={this.onSubmitConversation}>Create</button>
                    <button className="button" onClick={() => {this.setState({isActive: false});}}>Cancel</button>
                  </footer>
                </div>
              </div>              
            </div>
        );
    }
}

export default withRouter(ConversationCreate);
