import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeUserProfile } from 'services/Auth/api';
import { updateProfileInLocalStorage } from 'services/Auth/api';
import Input from 'components/Utils/Forms/Input';
import CheckBox from 'components/Utils/Forms/Checkbox';
import Radio from 'components/Utils/Forms/Radio';


class _PublicProfileForm extends Component {

    constructor(props){
        super(props);

        let birth = this.props.user.profile.birth;
        let [year, month, day] = birth ? birth.split('-') : ['', '', ''];
        
        this.state = {
            user: Object.assign({}, this.props.user),
            birth: {
                day: day,
                month: month,
                year: year
            },
            isSuccess: false,
            errors: {}
        };
        this.setSuccess = this.setSuccess.bind(this);
    }

    setSuccess(){
        this.setState({
            isSuccess: true 
        });
        return "Success";
    }
    
    formatDate(){
        let birth = this.state.birth;
        if (!birth.day && !birth.month && !birth.year){
            return null;
        }
        return `${birth.year}-${birth.month}-${birth.day}`;
    }

    successAlert(){
        alert("Your changes have been recorded.");
        document.location.reload(true);
    }

    profileErrors(){
        return this.state.errors.profile || {};
    }
    
    submitChange(){
        let newUser = this.state.user;
        newUser.profile.birth = this.formatDate();
        this.setState({
            errors: {} 
        });
        changeUserProfile(newUser).then(
            (response) => {
                updateProfileInLocalStorage(response.data);
                this.successAlert();
            }).catch(
                (error) => {
                    this.setState({
                        errors: error.response.data 
                    });
                }
            );
    }
    
    changeProfile(field, value){
        let newUser = Object.assign({}, this.state.user);
        newUser.profile[field] = value;
        this.setState({
            user: newUser
        });
    }
    
    changeUser(field, value){        
        let newUser = Object.assign({}, this.state.user);
        newUser[field] = value;
        this.setState({
            user: newUser,
        });
    }

    changeDate(field, value){
        let newBirth = Object.assign({}, this.state.birth);
        newBirth[field] = value;
        this.setState({
            birth: newBirth,
        });
    }
    
    renderName(){
        return (
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Name</label>
              </div>
              <div className="field-body">
                <Input
                  type="text"                     
                  placeholder="First Name"
                  name="firstName"
                  value={this.state.user.first_name}
                  onChange={(event) => {this.changeUser('first_name', event.target.value);}}
                  errorMessages={this.state.errors.first_name}
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={this.state.user.last_name}
                  onChange={(event) => {this.changeUser('last_name', event.target.value);}}
                  errorMessages={this.state.errors.last_name}
                />
                <CheckBox
                  name="displayName"
                  checked={this.state.user.profile.display_name}
                  onChange={(e) => this.changeProfile('display_name', e.target.checked)}
                  message={"   Public display" }
                  errorMessages={this.profileErrors().display_name}
                />
              </div>              
            </div>
        );
    }

    renderBirth(){
        return (
            <div className="field is-horizontal is-grouped">
              <div className="field-label is-normal">
                <label className="label">Birth date</label>
              </div>

              <div className="field-body">
                <Input
                  name="day"
                  type="text"
                  placeholder="Day"
                  value={this.state.birth.day}
                  onChange={(e) => this.changeDate('day', e.target.value)}
                />
                <Input
                  name="month"
                  type="text"
                  placeholder="Month"
                  value={this.state.birth.month}
                  onChange={(e) => this.changeDate('month', e.target.value)}
                />
                <Input 
                  name="year"
                  type="text"
                  placeholder="Year"
                  value={this.state.birth.year}
                  onChange={(e) => this.changeDate('year', e.target.value)}
                />                
                <CheckBox
                  name="member"
                  checked={this.state.user.profile.display_birth}
                  onChange={(e) => this.changeProfile('display_birth', e.target.checked)}
                  message={"   Public display"}
                />
                <p className="help is-danger">{this.profileErrors().birth}</p>
              </div>              
            </div>
        );        
    }

    renderSex(){
        return (
            <div className="field is-horizontal">
              <div className="field-label">
                <label className="label">Gender</label>
              </div>
              <div className="field-body">
                <Radio
                  name="sex"
                  value={this.state.user.profile.sex}
                  types={[
                      {
                          value: "M",
                          label: "   Male"
                      },
                      {
                          value: "F",
                          label : "   Female"
                      },
                      {
                          value: "N",
                          label: "   Not given"
                      }
                  ]}
                  onChange={(e) => {this.changeProfile('sex', e.target.value);}}
                  errorMessages={this.profileErrors().sex}
                />           
              <CheckBox
                name="member"
                checked={this.state.user.profile.display_sex}
                onChange={(e) => this.changeProfile('display_sex', e.target.checked)}
                message={"   Public display"}
                errorMessages={this.profileErrors().display_sex}
              />                
            </div>
            </div>
        );
    }

    renderDescription(){
        return (            
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Description</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <textarea className="textarea" placeholder="Your description will be publicly visible" value={this.state.user.profile.description} onChange={(e) => this.changeProfile('description', e.target.value)}></textarea>
                  </div>
                </div>
              </div>
            </div>
        );
    }

    renderButton(){
        return (
            <div className="field is-horizontal">
              <div className="field-label">               
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <button className="button is-primary" onClick={() => this.submitChange()}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
        );
    }
    
    
    render(){
        return (
            <div className="has-background-light has-padding-10 has-padding-right-20">
              <hr/>
              <h1 className="title is-4 has-text-centered">Account Settings</h1>
              <hr/>
              {this.renderName()}
              {this.renderBirth()}
              {this.renderSex()}
              {this.renderDescription()}
              {this.renderButton()}
              <br/>
            </div>
        );
    }    
};


const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};


const PublicProfileForm = connect(
    mapStateToProps
)(_PublicProfileForm);

export default PublicProfileForm;
