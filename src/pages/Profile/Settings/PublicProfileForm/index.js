import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeUserProfile } from 'services/Auth/api';
import { updateProfileInLocalStorage } from 'services/Auth/api';

class _PublicProfileForm extends Component {

    constructor(props){
        super(props);

        let birth = this.props.user.birth;
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
        console.log("success !!!");
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
        alert("Vos changements ont bien été pris en compte.");
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
                <label className="label">Nom</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded">
                    <input className="input"
                           type="text"
                           placeholder="Prénom"
                           value={this.state.user.first_name}
                           onChange={(event) => {this.changeUser('first_name', event.target.value);}}
                    />
                  </p>
                  <p className="help is-danger">{this.state.errors.first_name}</p>
                </div>
                <div className="field">
                  <p className="control is-expanded">
                    <input className="input"
                           type="text"
                           placeholder="Nom de famille"
                           value={this.state.user.last_name}
                           onChange={(event) => {this.changeUser('last_name', event.target.value);}}
                    />
                  </p>
                  <p className="help is-danger">{this.state.errors.last_name}</p>
                </div>
                <div className="field">
                  <div className="control has-padding-top-5">
                    <label className="checkout">
                      <input type="checkbox"
                             name="member"
                             checked={this.state.user.profile.display_name}
                             onChange={(e) => this.changeProfile('display_name', e.target.checked)}
                      />
                      {"   "}Afficher sur mon profil
                    </label>
                  </div>
                  <p className="help is-danger">{this.profileErrors().display_name}</p>
                </div>
              </div>              
            </div>
        );
    }

    renderBirth(){
        return (
            <div className="field is-horizontal is-grouped">
              <div className="field-label is-normal">
                <label className="label">Date de naissance</label>
              </div>

              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input className="input"
                           name="day"
                           type="number"
                           min="1"
                           max="31"
                           placeholder="Jour"
                           value={this.state.birth.day}
                           onChange={(e) => this.changeDate('day', e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input className="input"
                           name="month"
                           type="number"
                           min="1"
                           max="12"
                           placeholder="Mois"
                           value={this.state.birth.month}
                           onChange={(e) => this.changeDate('month', e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <input className="input"
                           name="year"
                           min="1900"            
                           type="number"
                           placeholder="Année"
                           value={this.state.birth.year}
                           onChange={(e) => this.changeDate('year', e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control has-padding-top-5">
                    <label className="checkout">
                      <input type="checkbox" name="member"
                             checked={this.state.user.profile.display_birth}
                             onChange={(e) => this.changeProfile('display_birth', e.target.checked)}
                      />
                      {"   "}Afficher sur mon profil
                    </label>
                  </div>
                </div>
            <p className="help is-danger">{this.profileErrors().birth}</p>
              </div>              
            </div>
        );        
    }

    renderSex(){
        return (
            <div className="field is-horizontal">
              <div className="field-label">
                <label className="label">Sexe</label>
              </div>
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control">
                    <label className="radio">
                      <input type="radio"
                             name="sex"
                             value="H"
                             onChange={(e) => {this.changeProfile('sex', e.target.value);}}
                             checked={this.state.user.profile.sex === "H"}
                      />
                      {"  "}Homme
                    </label>
                    <label className="radio">
                      <input type="radio"                        
                             name="sex"
                             value="F"
                             onChange={(e) => {this.changeProfile('sex', e.target.value);}}
                             checked={this.state.user.profile.sex === "F"}
                      />
                      {"  "}Femme
                    </label>
                    <label className="radio">
                      <input type="radio"
                             name="sex"
                             value="N"
                             onChange={(e) => {this.changeProfile('sex', e.target.value);}}
                             checked={this.state.user.profile.sex === "N"}
                      />
                      {"  "}Non précisé
                    </label>
                  </div>
                  <p className="help is-danger">{this.profileErrors().sex}</p>
                </div>
                <div className="field">
                  <div className="control has-padding-top-5">
                    <label className="checkout">
                      <input type="checkbox" name="member"
                             checked={this.state.user.profile.display_sex}
                             onChange={(e) => this.changeProfile('display_sex', e.target.checked)}
                      />
                      {"   "}Afficher mon genre sur mon profil
                    </label>
                  </div>
                  <p className="help is-danger">{this.profileErrors().display_sex}</p>
                </div>
                
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
                    <textarea className="textarea" placeholder="Votre description sera visble sur votre profil" value={this.state.user.profile.description} onChange={(e) => this.changeProfile('description', e.target.value)}></textarea>
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
                      Enregistrer les modifications
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
              <h1 className="title is-4 has-text-centered">Modifier votre profil</h1>
              <hr/>
              {this.renderName()}
              {this.renderBirth()}
              {this.renderSex()}
              {this.renderDescription()}
              {this.renderButton()}
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
