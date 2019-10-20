import React, { Component } from 'react';
import Base from './base';
import { toggleFollow, findIfUserFollows } from 'services/Followers';

class OtherUserButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message_link : "/",
            is_followed: false            
        };
        this.onToggleFollow = this.onToggleFollow.bind(this);
    }

    componentDidMount(){
        findIfUserFollows(this.props.username).then(
            (response) => {
                console.log(response.data);
                this.setState({
                    is_followed: response.data.count === 1
                });
            }
        );
    }

    onToggleFollow(){
        toggleFollow(this.props.username).then(
            (response) => {
                this.setState(
                    {
                        is_followed: response.data.is_followed
                    }
                );
            }
        );
    }

    render(){
        return (
            <Base
              message_link={this.state.message_link}
              is_followed={this.state.is_followed}
              onToggleFollow={this.onToggleFollow}
            />
        );
    }
    
}

export default OtherUserButtons;
