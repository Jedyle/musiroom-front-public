import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getNotificationsUrl } from 'pages/urls';
import { getNotifUnreadCount } from 'services/Notifications';

import './index.css';

class NotificationBell extends Component {

    constructor(props){
        super(props);
        this.state = {
            unread: 0
        };
    }

    fetchCount(){
        getNotifUnreadCount().then((res) => {
            this.setState({
                unread: res.data.unread
            });
        }).catch(err => {});        
    }

    componentDidMount(){
        this.fetchCount();
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.location.pathname !== prevProps.location.pathname){           
            this.fetchCount();
        }
    }
    
    render(){
        return (
            <Link to={getNotificationsUrl()} onClick={this.props.onClick}>
              <span className="icon">                     
                <i className="fa fa-lg fa-bell"></i>
              </span>
              { this.state.unread > 0 &&
                (
                    <span className="notif">{this.state.unread}</span>
                )
              }              
            </Link>
        );
    }
}

export default withRouter(NotificationBell);
