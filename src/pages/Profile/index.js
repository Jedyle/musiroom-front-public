import React, { Component } from 'react';
import ProfileSidebar from 'components/Profile/Sidebar';
import { getProfile } from 'services/Profile';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: null
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
    };

    render(){
        console.log(this.props.match);
        return (
            <div className="columns is-multiline is-marginless is-paddingless">
              <div className="column is-12-mobile is-3-tablet">
                {this.state.profile ? (
                    <ProfileSidebar
                    {...this.state.profile}
                    />
                ) : ''}
              </div>
              <div className="column is-12-mobile is-9-tablet">Profil</div>
            </div>
        );
    }
}

export default Profile;
