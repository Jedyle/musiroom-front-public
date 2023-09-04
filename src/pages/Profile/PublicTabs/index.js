import React, { Component } from 'react';
import ListsTab from './ListsTab';
import ProfileTab from './ProfileTab';
import ContactsTab from './ContactsTab';
import ReviewsTab from './ReviewsTab';
import DiscussionsTab from './DiscussionsTab';
import CollectionTab from './CollectionTab';
import ProfileTabs from 'components/Profile/Tabs';
import Head from 'components/Utils/Head';
import { Route, Link } from "react-router-dom";
import { join } from 'utils/urls';

class PublicProfileTabs extends Component {

    constructor(props){
        super(props);
        this.state = {
            tabIndex: 0,
            tabs: [
                {
                    icon: "fa fa-user",
                    title: "Account",
                    subLink: "",
                    exact: true,
                    render: (props) => <ProfileTab
                                         {...props}
                                         profile={this.props.profile}
                                       />
                },
                {
                    icon: "fa fa-headphones",
                    title: "Collection",
                    subLink: "/collection",
                    exact: true,
                    render: (props) => <CollectionTab
                                         {...props}
                                         profile={this.props.profile}
                                       />
                },
                {
                    icon: "fa fa-sticky-note",
                    title: "Reviews",
                    subLink: "/reviews",
                    exact: true,
                    render: (props) => <ReviewsTab
                                         {...props}
                                         profile={this.props.profile}
                                       />
                },
                {
                    icon: "fa fa-list",
                    title: "Lists",
                    subLink: "/lists",
                    exact: true,
                    render: (props) => <ListsTab
                                         {...props}
                                         profile={this.props.profile}
                                       />
                },
                {
                    icon: "fa fa-comment",
                    title: "Discussions",
                    subLink: "/discussions",
                    exact: true,
                    render: (props) => <DiscussionsTab
                                         {...props}
                                         profile={this.props.profile}
                                       />
                },
                {
                    icon: "fa fa-address-book",
                    title: "Contacts",
                    subLink: "/contacts",
                    exact: true,
                    render: (props) => <ContactsTab
                                         {...props}
                                         profile={this.props.profile}
                                       />
                }
            ]
        };
    }

    render(){
        return (
            <div>
              <Head
                title={`${this.props.profile.user}'s collection`}
                description={`Discover ${this.props.profile.user}'s profile and collection.`}
                image={this.props.profile.avatar}
                url={window.location.href}
              />
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

        );
    }
}

export default PublicProfileTabs;
