import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { register, resendLink } from 'services/Registration';
import FormBuilder from 'components/Utils/Forms/Builder';
import HeadLine from 'components/Utils/HeadLine';
import Title from 'components/Utils/Title';

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                username: '',
                password: '',
                password_confirm: ''
            },
            formErrors: {
                non_field_errors: '',
                email: '',
                username: '',
                password: '',
                password_confirm: ''
            }
        };
    }

    setFormData = (field) => ((e) => {
        let form = this.state.form;
        form[field] = e.target.value;
        this.setState({
            form: form
        });
    })

    formConfig(){
        let { form, formErrors } = this.state;
        return ({
            nonFieldErrors: formErrors.non_field_errors,
            fields: [
                {
                    verboseName: 'Username',
                    name: 'username',
                    errorField: 'username',
                    inputType: 'text',
                    placeholder: 'JohnDoe',
                    helpText: 'Might contain letters, numbers, - and _',
                    value: form.username,
                    error: formErrors.username,
                    icon: (<i className="fa fa-user"></i>),
                    onChange: this.setFormData('username')
                },
                {
                    verboseName: 'Email',
                    name: 'email',
                    errorField: 'email',
                    inputType: 'email',
                    placeholder: 'john@mail.com',
                    helpText: null,
                    value: form.email,
                    error: formErrors.email,
                    icon: (<i className="fa fa-at"></i>),                    
                    onChange: this.setFormData('email')
                },
                {
                    verboseName: 'Password',
                    name: 'password',
                    errorField: 'password',
                    inputType: 'password',
                    placeholder: null,
                    helpText: null,
                    value: form.password,
                    error: formErrors.password,
                    icon: (<i className="fa fa-lock"></i>),
                    onChange: this.setFormData('password')
                },
                {
                    verboseName: 'Confirm password',
                    name: 'password_confirm',
                    errorField: 'password_confirm',
                    inputType: 'password',
                    placeholder: null,
                    helpText: null,
                    value: form.password_confirm,
                    error: formErrors.password_confirm,
                    icon: (<i className="fa fa-lock"></i>),                    
                    onChange: this.setFormData('password_confirm')
                }        
            ],
            buttons: [{
                classes: "is-fullwidth is-info",
                onClick: this.register,
                text: "Register"                
            }]
        }
        );        
    }

    registerUser = () => {
        let { registrationCallback } = this.props;
        let { form } = this.state;
        register(form).then((response) => {
            registrationCallback({
                username: response.data.username
            });
        }).catch((error) => {
            if (error.response.status === 400){
                this.setState({
                    formErrors: error.response.data
                });
            }
        });
    }    
    
    render() {
        return (
            <div className="columns is-multiline is-mobile">
              <div className="column is-12">
                <HeadLine
                  title="Join MusiRoom"
                  titleClasses="is-size-1"
                />
              </div>
              <div className="column has-background-white-ter is-12-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop">
                <h1 className="title has-text-centered mt-5">Sign up</h1>
                <FormBuilder
                  config={this.formConfig()}
                  onSubmit={() => this.registerUser()}
                />                
              </div>
            </div>
        );
    }
}


const ActivationLinkSent = ({sendLink}) => (
    <div className="columns">
      <div className="column">
        <br/>
        <br/>
        <h1 className="title has-text-centered">A confirmation email has been sent to you.</h1>
        <p className="has-text-centered">
          You didn't receive any link ?
          <div className="has-text-centered mt-3">
            <button
              className="button is-info"
              onClick={sendLink}
            >Send me another link</button>
          </div>          
        </p>
        </div>
    </div>
);


class RegistrationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegistrationComplete: false,
            username: ''
        };
    }

    onRegistrationComplete = ({username}) => {
        this.setState({
            isRegistrationComplete: true,
            username: username
        });
    }

    sendLink = () => {
        resendLink(this.state.username).then((response) => {
            alert("An email has been sent to you !"); 
        }).catch((error) => {
            if (error.response.status === 400){
                alert(error.response.data[0]);
            }
        });
    }
    
    render(){
        let { isRegistrationComplete, username } = this.state;
        return (
            <>
              <Title title="Register"/>
              {
                  isRegistrationComplete ?
                      <ActivationLinkSent
                        username={username}
                        sendLink={this.sendLink}
                      /> :
                  <RegistrationForm
                    registrationCallback={this.onRegistrationComplete}
                  />
              }
            </>
        );
    }
    
}


export default withRouter(RegistrationPage);
