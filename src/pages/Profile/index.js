import React, { Component } from 'react';
import ProfileSidebar from 'components/Profile/Sidebar';
import { getProfile } from 'services/Profile';
import { findIfUserIsFollowedBy } from 'services/Followers';
import ProfileTabs from 'components/Profile/Tabs';
import ProfileTab from './ProfileTab';
import DiscussionsTab from './DiscussionsTab';
import {Route, Link} from "react-router-dom";
import { join } from 'utils/urls';
import { getUser } from 'services/Auth/api';
import OwnUserButton from 'components/Profile/Sidebar/Buttons/OwnUser';
import OtherUserButton from 'components/Profile/Sidebar/Buttons/OtherUser';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            followsYou: false,
            tabIndex: 0,
            tabs: [
                {
                    icon: "fa fa-user",
                    title: "Profil",
                    subLink: "",
                    exact: true,
                    render: (props) => <ProfileTab
                                         {...props}
                                         profile={this.state.profile}
                                       />
                },
                {
                    icon: "fa fa-comment",
                    title: "Discussions",
                    subLink: "/discussions",
                    exact: true,
                    render: (props) => <DiscussionsTab
                                         {...props}
                                         profile={this.state.profile}
                                       />
                },
            ]
        };
    }
    
    componentDidMount(){
        getProfile(this.props.match.params.username).then(
            (response) => {
                this.setState({
                    profile: response.data
                });
            }
        );
        if (getUser())
        {
            findIfUserIsFollowedBy(this.props.match.params.username).then(
                (response) => {
                    this.setState(
                        {
                            followsYou: response.data.count === 1
                        }
                    );
                }
            );
        }
    };

    getUserButtons(){
        let user = getUser();
        if (!user){
            return "";           
        }
        if (getUser() === this.state.profile.user){
            return (<OwnUserButton
                      changeProfileLink="/"
                      settingsLinkg="/"
                    />);
        }
        return (
            <OtherUserButton
              username={this.state.profile.user}
            />
        );
    };

    render(){
        return (
            <div className="columns is-multiline is-marginless is-paddingless">
              <div className="column is-12-mobile is-3-tablet">
                {this.state.profile ? (
                    <ProfileSidebar
                      {...this.state.profile}
                      follows_you={this.state.followsYou}
                      user_buttons={this.getUserButtons()}
                    />
                ) : ''}
              </div>
              <div className="column is-12-mobile is-7-tablet">
                <ProfileTabs
                  tabs = {this.state.tabs.map((tab, index) => (
                      <Link to={join(this.props.match.url, tab.subLink)} activeClassName="is-active">
                        <span className="icon is-small"><i className={tab.icon} aria-hidden="true"></i></span>
                        <span>{tab.title}</span>
                      </Link>
                  ))}
                />
                <div>
                    {this.state.tabs.map((tab, index) => (
                        <Route
                          exact={tab.exact}
                          path={join(this.props.match.url, tab.subLink)}
                          render={tab.render}
                        />
                    ))}
                </div>
              </div>
            </div>
        );
    }
}

export default Profile;
