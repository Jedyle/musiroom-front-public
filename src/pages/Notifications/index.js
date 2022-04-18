import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroller";
import { profileUrl, getDiscussionUrl, getReviewUrl } from 'pages/urls';
import { getNotifications, markAllNotifsAsRead } from 'services/Notifications';
import { toHumanDate } from 'utils/date';
import Title from 'components/Utils/Title';

import './index.css';

const NotificationItem = ({notification}) => {

    let targetComponents = {
        discussion: ({target}) => (
            <Link to={getDiscussionUrl(target.id)}>{target.title}</Link>
        ),
        review: ({target}) => (
            <Link to={getReviewUrl(target.rating.content_object.mbid, target.id)}>{target.title}</Link>
        ),
        badgeaward: ({target}) => (target.name)
    };

    let Target = targetComponents[notification.target_content_type];
    
    return (
        <div className="columns">
          <div className="column is-narrow" style={{width: '35xpx'}}>
            {notification.unread && (<span className="dot"></span>)}
          </div>
          <div className="column">
            <span className="is-size-7">
              {toHumanDate(notification.timestamp)} {" "} - {" "}
            </span>
            <span>
              { notification.actor && (
                  <Link to={profileUrl(notification.actor.username)}>
                    {notification.actor.username}
                  </Link>
              )}
              {" "}
              { notification.verb }
              {" "}
            </span>
            {Target &&
             <Target
               target={notification.target}
             />
            }            
          </div>      
        </div>);
};


export default class Notifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            hasNext: true            
        };
        this.fetchNotifications = this.fetchNotifications.bind(this);
    }

    fetchNotifications(page){
        getNotifications({page: page, limit: 10}).then((response) => {
            this.setState((prevState) => ({
                notifications: prevState.notifications.concat(response.data.results),
                hasNext: response.data.next !== null
            }));            
        });
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.hasNext === false && prevState.hasNext === true){
            markAllNotifsAsRead();
        }
    }
    
    render() {
        return (
            <div className="columns">
              <Title title="Notifications"/>
              <div className="column is-12-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop">
                <h1 className="title has-text-centered">
                  Notifications
                </h1>
                <div className="list">
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.fetchNotifications}
                    hasMore={this.state.hasNext}
                    loader={<div>Loading...</div>}
                  >
                    {this.state.notifications.map((notification) => (
                        <div className="list-item">
                          <NotificationItem
                            notification={notification}
                          />
                        </div>
                    ))}
                  </InfiniteScroll>                
                </div>
              </div>
            </div>
        );
    }
}
