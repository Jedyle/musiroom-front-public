import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css';
import { getUser } from 'services/Auth/api';


export default class ConvUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getUsers = () => (this.props.members.map(member => member.user))

    isActiveUser = () => (this.getUsers().includes(getUser()))
    
    makeMemberObjectsFromTags = (tags) => (tags.map(tag => ({user: tag})))

    tagProps = () => (this.isActiveUser() ?
                      {
                          className: "tag is-success is-light is-large mr-1",
                          classNameRemove: "delete is-small"
                      } :
                      {
                          className: "tag is-info is-light is-large mr-1",
                      })

    inputProps = () => (this.isActiveUser() ?
                        {
                            className: 'react-tagsinput-input',
                            placeholder: 'Ajouter un membre',
                            style: {
                                width: 'auto'
                            }
                        } :
                        {
                            className: 'react-tagsinput-input',
                            disabled: true,
                            placeholder: "",
                            style: {
                                width: 'auto'
                            }
                        }
                       )
    
    render() {
        return (            
            <div className="mt-2">
              <h1 className="title is-size-5 mb-1">Membres</h1>
              <TagsInput
                value={this.getUsers()}
                onChange={(tags) => this.props.onChangeMembers(this.makeMemberObjectsFromTags(tags))}
                maxTags={20}
                tagProps={this.tagProps()}
                inputProps={this.inputProps()}
              />
            </div>
        );
    }
};
