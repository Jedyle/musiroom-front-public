import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, closeLoginModal } from 'services/Auth/api';
import { getRegistrationUrl } from 'pages/urls';
import FormBuilder from 'components/Utils/Forms/Builder';

const mapStateToProps = (state, ownProps) => ({
    isActive: state.auth.loginModalIsActive
});

class _LoginForm extends Component {

    constructor(props) {
        super(props);
        this.loginRef = React.createRef();
        this.state = {
            form: {
                username: '',
                password: ''
            },
            formErrors: {
                username: '',
                password: '',
                non_field_errors: ''
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
            fields:  [
                {
                    verboseName: 'username',
                    name: 'username',
                    errorField: 'username',
                    inputType: 'text',
                    placeholder: null,
                    helpText: null,
                    value: form.username,
                    error: formErrors.username,
                    icon: (<i className="fa fa-user"></i>),
                    onChange: this.setFormData('username'),
                    ref: this.loginRef
                },
                {
                    verboseName: 'password',
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
            ],
            buttons: [{
                classes: "is-fullwidth is-info",
                onClick: this.onLogin,
                text: "Log In"
            }]
        }
        );        
    }

    onLogin = () => {
        let { form } = this.state;
        login(form.username, form.password).then(() => {
            window.location.reload(false);
        }).catch(error => {
            this.setState({
                formErrors: error.response.data 
            });
        });        
    }

    componentDidUpdate(prevProps){
        if (!prevProps.isActive && this.props.isActive){
            this.loginRef.current.focus();
        }
    }
    
    render() {
        let { isActive } = this.props;
        return (
            <div className={`modal ${isActive && 'is-active'}`}>
            <div className="modal-background"></div>
              <div className="modal-card">
                <div className="modal-card-head">
                  <p className="modal-card-title">Log-In</p>
                  <button className="delete" aria-label="close" onClick={closeLoginModal}></button>
                </div>
                <div className="modal-card-body">

                  <FormBuilder
                    config={this.formConfig()}
                    onSubmit={this.onLogin}
                  />

                  <p className="mt-2">No account ? <Link
                                       to={getRegistrationUrl()}
                                       onClick={closeLoginModal}
                                                   >Sign up !</Link></p>
                  <a className="mt-2" href={process.env.REACT_APP_API_URL + "/auth/password/reset/"}>Forgot your password ?</a>
                  
                </div>
            </div>
              <button
                className="modal-close is-large"
                aria-label="close"
                onClick={closeLoginModal}
              ></button>
            </div>
        );
    }
}

const LoginForm = connect(
    mapStateToProps
)(_LoginForm);

export default LoginForm;
