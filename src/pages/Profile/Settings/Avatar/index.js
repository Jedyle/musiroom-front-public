import React, { Component } from 'react';
import { changeAvatar } from 'services/Auth/api';

class AvatarForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            file: null,
            errors: []
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        changeAvatar(this.state.file).then(
            (response) => {
                alert("Votre avatar a été mis à jour.");
                document.location.reload(true);
            }
        ).catch(error => {
            this.setState({
                errors: error.response.data.avatar
            });
        });
    }
    
    render(){

        return (
            <div className="has-background-light has-padding-10">
              <hr/>
              <h1 className="title is-4 has-text-centered">Modifier votre avatar</h1>
              <hr/>

              <div className="field is-horizontal">
                <figure className="image is-128x128">
                  <img src={this.state.file ? URL.createObjectURL(this.state.file) : ""}/>
                </figure>                
                <div className="field-label"></div>
                <div className="field-body">
                  <div className="file">
                    <label className="file-label">
                      <input className="file-input"
                             type="file"
                             name="resume"
                             onChange={(e) => {this.setState({file: e.target.files[0]});}}
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fa fa-upload"></i>
                        </span>
                        <span className="file-label">
                          Choisissez un fichier...
                        </span>
                        <p className="has-margin-left-5 help is-danger">{this.state.errors}</p>
                      </span>
                      {this.state.file ? 
                       (
                           <span className="file-name">
                             {this.state.file.name}
                           </span>
                       ) : ""
                      }
                    </label>
                  </div>
                  <button className="button is-info" onClick={this.onClick}>Mettre à jour</button>
                </div>
              </div>
            </div>
    );
}
}

export default AvatarForm;
