import React, { Component } from 'react';
import Button from 'components/Utils/Forms/Button';
import { changePassword } from 'services/Auth/api';

const PasswordInput = ({
    label,
    password,
    onChange,
    placeholder,
    error
}) => (
      <div className="field is-horizontal">
        <div className="field-label">{label}</div>
        <div className="field-body">
          <input className="input" type="password" placeholder={placeholder} value={password} onChange={onChange} />
        </div>
        <p className="has-margin-left-5 help is-danger">{error}</p>
      </div>
);

class PasswordForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            new_password1: '',
            new_password2: '',
            old_password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(field, value){
        this.setState({
            [field]: value
        });
    }

    onClick(){
        changePassword(this.state).then(
            (response) => {
                alert("Votre mot de passe a été modifié.");
                document.location.reload(true);
            }
        ).catch(
            (error) => {
                this.setState({
                    errors: error.response.data
                });
            }
        );
    }

    render(){
        return (
            <div className="has-background-light has-padding-10 has-padding-right-20">
              <hr/>
              <h1 className="title is-4 has-text-centered">Modifier votre mot de passe</h1>
              <hr/>
              <PasswordInput
                label="Nouveau mot de passe"
                password={this.state.new_password1}
                onChange={(e)=> {this.onChange('new_password1', e.target.value);}}
                placeholder="Nouveau mot de passe"
                error={this.state.errors.new_password1}
              />
              <PasswordInput
                label="Confirmer votre nouveau mot de passe"
                password={this.state.new_password2}
                onChange={(e)=> {this.onChange('new_password2', e.target.value);}}
                placeholder="Confirmer votre nouveau mot de passe"
                error={this.state.errors.new_password2}
              />
              <PasswordInput
                label="Mot de passe actuel"
                password={this.state.old_password}
                onChange={(e)=> {this.onChange('old_password', e.target.value);}}
                placeholder="Mot de passe actuel"
                error={this.state.errors.old_password}
              />
              <Button
                buttonClass="is-info"
                message="Modifier votre mot de passe"
                onClick={this.onClick}
              />
              <br/>
            </div>            
        );
    }
    
}
 
export default PasswordForm;
