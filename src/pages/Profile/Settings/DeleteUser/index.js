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
        if (window.confirm("Are you sure you want to delete your account ? This action cannot be reverted.")){
            deleteUser(this.state.password).catch(error => {
                if (error.response.status === 400){
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
                    verboseName: 'Confirm password',
                    icon: (<i className="fa fa-lock"></i>),
                    error: this.state.formErrors.password,
                    inputType: 'password',
                    placeholder: null,
                    onChange: (e) => (this.setState({password: e.target.value})),
                    helpText: 'WARNING : this action is irreversible!'
                }
            ],
            buttons: [{
                classes: "button is-danger",
                onClick: () => this.deleteAccount(),
                text: "Delete my account"
            }]
        };
    }

    render(){
        return (
            <div className="has-background-light has-padding-10 has-padding-right-20">
              <hr/>
              <p className="title is-4 has-text-centered">DANGER - Delete my account</p>
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

