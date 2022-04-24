import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileSidebar from 'components/Profile/Sidebar';
import { getProfile } from 'services/Profile';
import { findIfUserIsFollowedBy, findIfUserFollows, toggleFollow } from 'services/Followers';
import { getUser } from 'services/Auth/api';
import OwnUserButton from 'components/Profile/Sidebar/Buttons/OwnUser';
import OtherUserButton from 'components/Profile/Sidebar/Buttons/OtherUser';
import { changeProfileUrl, listConversationsUrl } from 'pages/urls';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            followsYou: false,
            isFollowed: false
        };
    }
    
    componentDidMount(){
        getProfile(this.props.username).then(
            (response) => {
                this.setState({
                    profile: response.data
                });
            }
        );
        if (getUser())
        {
            findIfUserIsFollowedBy(this.props.username).then(
                (response) => {
                    this.setState(
                        {
                            followsYou: response.data.count === 1
                        }
                    );
                }
            );
            findIfUserFollows(this.props.username).then(
                (response) => {
                    this.setState({
                        isFollowed: response.data.length === 1
                    });
                }
        );            
        }
    };

    onToggleFollow = () => {
        toggleFollow(this.props.username).then(
            (response) => {
                this.setState(
                    {
                        isFollowed: response.data.is_followed
                    }
                );
            }
        );
    }
    

    getUserButtons(){
        let user = getUser();
        if (!user){
            return "";           
        }
        if (getUser() === this.state.profile.user){
            return (<OwnUserButton
                      changeProfileLink={changeProfileUrl()}
                    />);
        }
        return (
            <OtherUserButton
              username={this.state.profile.user}
              onToggleFollow={this.onToggleFollow}
              isFollowed={this.state.isFollowed}
              messageLink={listConversationsUrl()}
            />
        );
    };

    render(){
        let BodyComponent = this.props.body;
        return (
            <div className="columns is-multiline is-marginless is-paddingless">
              <div className="column is-12-mobile is-3-desktop">
                {this.state.profile && (
                    <ProfileSidebar
                      {...this.state.profile}
                      follows_you={this.state.followsYou}
                      user_buttons={this.getUserButtons()}
                    />
                )}
              </div>
              <div className="column is-12-mobile is-7-widescreen has-padding-left-30">
                {this.state.profile && (
                    <BodyComponent
                      {...this.props}
                      profile={this.state.profile}
                    />   
                )}
              </div>
            </div>
        );
    }
}

Profile.propTypes = {
    body: PropTypes.element.isRequired
};

export default Profile;
