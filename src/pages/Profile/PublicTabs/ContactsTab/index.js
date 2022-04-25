import React, { Component } from 'react';
import { getUserFollowers, getUserFollowees } from 'services/Followers';
import ContactGallery from 'components/Profile/Contacts/ContactGallery';
import { profileUrl } from 'pages/urls';

const formatUserAttributes = (user) => {
    return {
        id: user.id,
        user: user.user,
        avatar: user.avatar,
        profile_url: profileUrl(user.user)
    };
};

function distinctUsers(user_list){
    return Array.from(new Set(user_list.map((user) => user.user))).map(
        (user) => {                   
            return user_list.find((contact) => contact.user === user);
        }
    );
}

class ContactsTab extends Component {

    constructor(props){
        super(props);
        this.state = {
            followers: [],
            followees: [],
            filter: "all"
        };
        this.onFilterChange = this.onFilterChange.bind(this);
    }
    
    componentDidMount(){
        if (this.props.profile){
            this.fetchUserContacts();
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.profile !== prevProps.profile){
            this.fetchUserContacts();
        }
    }

    fetchUserContacts(){
        getUserFollowers(this.props.profile.user).then(
            (response) => {
                this.setState({
                    followers: response.data.map(formatUserAttributes)
                });
            }
        );
        getUserFollowees(this.props.profile.user).then(
            (response) => {
                this.setState({
                    followees: response.data.map(formatUserAttributes)
                });
            }
        );
    }

    filterContactList(){
        switch (this.state.filter){
        case "followees":
            return this.state.followees;
        case "followers":
            return this.state.followers;
        default:
            let allContacts = this.state.followers.concat(this.state.followees);
            return distinctUsers(allContacts);
        }
    }
    
    renderContacts(){
        return this.filterContactList().sort(
            (a, b) => {
                return a['user'] < b['user'];                
            } 
        );
    }

    onFilterChange(event){
        this.setState({
            filter: event.target.value
        });
    }
    
    render(){
        return (
            <div>
              <div className="select">
                <select value={this.state.value} onChange={this.onFilterChange}>
                  <option value="all">All</option>
                  <option value="followers">Followers</option>
                  <option value="followees">Followees</option>
                </select>
              </div>
              <br/>
              <br/>
              <ContactGallery
                contacts={this.renderContacts()}
              />
            </div>
        );
    }
}

export default ContactsTab;
