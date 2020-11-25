import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { register } from 'services/Registration';
import { activationLinkSentUrl } from 'pages/urls';

class Registration extends Component {

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

    fields(){
        let { form } = this.state;
        return (
            [
                {
                    verboseName: 'Pseudo',
                    name: 'username',
                    errorField: 'username',
                    inputType: 'text',
                    placeholder: 'JohnDoe',
                    helpText: 'Un pseudo peut contenir des chiffres, des lettres, _ et -',
                    value: form.username,
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
                    onChange: this.setFormData('email')
                },
                {
                    verboseName: 'Mot de passe',
                    name: 'password',
                    errorField: 'password',
                    inputType: 'password',
                    placeholder: null,
                    helpText: null,
                    value: form.password,
                    onChange: this.setFormData('password')
                },
                {
                    verboseName: 'Confirmez votre mot de passe',
                    name: 'password_confirm',
                    errorField: 'password_confirm',
                    inputType: 'password',
                    placeholder: null,
                    helpText: null,
                    value: form.password_confirm,
                    onChange: this.setFormData('password_confirm')
                }        
            ]
        );        
    }

    register(){
        let { history } = this.props;
        let { form } = this.state;
        register(form).then((response) => {
            history.push(activationLinkSentUrl());
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 400){
                this.setState({
                    formErrors: error.response.data
                });
            }
        });
    }
    
    render() {

        let { formErrors } = this.state;
        
        return (
            <div className="columns is-multiline is-mobile">
              <div className="column is-12">
                <section className="hero has-background-grey-lighter">
                  <div className="hero-body">
                    <div className="container">
                      <h1 className="title has-text-centered is-size-1">
                        Rejoignez La Musithèque
                      </h1>
                    </div>
                  </div>
                </section>
              </div>
              <div className="column has-background-white-ter is-12-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop">
                <h1 className="title has-text-centered mt-5">Inscription</h1>

                <div>

                  <p className="help is-danger">{formErrors.non_field_errors}</p>

                  { this.fields().map((field) => (
                      <div className="field">
                        <label className="label">{field.verboseName}</label>
                        <div className="control has-icons-left has-icons-right">
                          <input className={`input ${formErrors[field.errorField] && 'is-danger'}`} type={field.inputType} placeholder={field.placeholder} value={field.value} onChange={field.onChange} />
                          <span className="icon is-small is-left">
                            <i className="fa fa-user"></i>
                          </span>
                          {formErrors[field.errorField] &&
                           (
                               <span className="icon is-small is-right">
                                 <i className="fa fa-exclamation-triangle"></i>
                               </span>    
                           )
                          }                                           
                        </div>
                        {field.helpText &&
                         <p className="help">{field.helpText}</p>
                        }                        
                        <p className="help is-danger">{formErrors.username}</p>
                      </div>
                  ))}

                  <br/>
                  <div className="field is-grouped">
                    <div className="control is-expanded">
                      <button
                        className="button is-fullwidth is-info"
                        onClick={() => this.register()}
                      >Je m'inscris</button>
                    </div>
                  </div>

                  <br/>
                </div>
                
              </div>
            </div>
        );
    }
}

export default withRouter(Registration);
