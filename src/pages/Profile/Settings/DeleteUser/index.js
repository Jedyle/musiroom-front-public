import React, { Component } from 'react';
import FormBuilder from 'components/Utils/Forms/Builder';
import { deleteUser } from 'services/Auth/api';

export default class DeleteUserForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            password: '',
            formErrors: {
                password: '',
                message: ''
            }
        };
    }

    deleteAccount(){
        if (window.confirm("Êtes-vous sur de vouloir supprimer votre compte ? Cette action est irréversible.")){
            deleteUser(this.state.password).catch(error => {
                console.log(error.response);
                if (error.response.status === 400){
                    console.log(error.response.data);
                    this.setState({
                        formErrors: error.response.data
                    });
                }
            });
        }
    }

    formConfig(){
        return {
            nonFieldErrors: this.state.formErrors.message,
            fields: [
                {
                    verboseName: 'Confirmez votre mot de passe pour supprimer votre compte',
                    icon: (<i className="fa fa-lock"></i>),
                    error: this.state.formErrors.password,
                    inputType: 'password',
                    placeholder: null,
                    onChange: (e) => (this.setState({password: e.target.value})),
                    helpText: 'ATTENTION : cette action est irréversible'                    
                }
            ],
            buttons: [{
                classes: "button is-danger",
                onClick: () => this.deleteAccount(),
                text: "Supprimer mon compte"
            }]
        };
    }

    render(){
        return (
            <div className="has-background-light has-padding-10 has-padding-right-20">
              <hr/>
              <h1 className="title is-4 has-text-centered">DANGER - Supprimer votre compte</h1>
              <hr/>
              <FormBuilder
                config={this.formConfig()}
                onSubmit={() => {}}
              />
              <br/>
            </div>            
        );
    }
    
}

