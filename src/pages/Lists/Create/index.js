import React, { Component } from 'react';
import Input from 'components/Utils/Forms/Input';
import CheckBox from 'components/Utils/Forms/Checkbox';
import Title from 'components/Utils/Title';

import { createList } from 'services/Lists';

export default class CreateList extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            errors: {},
            description: "",
            ordered: false
        };
    }

    toggleCheck = () => {
        this.setState((prevState) => ({
            ordered: !prevState.ordered
        }));
    }

    onSubmit = () => {
        const {title, description, ordered } = this.state; 
        createList(
            {
                title: title,
                description: description,
                ordered: ordered
            }).then((response) => {
            alert("Votre liste a bien été créée !");
            // redirect to list details
            }).catch((error) => {
                if (error.response.status === 400){
                    this.setState({
                        errors: error.response.data
                    });
                }
            });
    }
    
    render() {
        return (
            <div className="columns is-mobile">
              <Title title="Nouvelle liste"/>
              <div className="column is-12-mobile is-6-desktop is-offset-3-desktop">
                <br/>
                <h1 className="title">Nouvelle Liste</h1>
                <div>
                  <Input
                    placeholder="Titre"
                    name="title"
                    value={this.state.title}
                    onChange={(e) => {this.setState({title: e.target.value});}}
                    errorMessages={this.state.errors.title}
                  />
                  <textarea
                    className="textarea"
                    placeholder="Description"
                    value={this.state.description}
                    rows="10"
                    onChange={(e) => {this.setState({description: e.target.value});}}
                  ></textarea>
                  <CheckBox
                    name="ordered"
                    checked={this.state.ordered}
                    onChange={this.toggleCheck}
                    message="Liste ordonnée (top)"
                    errorMessages={this.state.errors.ordered}
                  />
                  <button className="button is-info is-fullwidth"
                          onClick={this.onSubmit}
                  >Valider</button>
                </div>
              </div>
            </div>
        );
    }
}
