import React, { Component } from 'react';
import { listAllGenres, createGenre } from 'services/Genres';
import { getGenresUrl } from 'pages/urls';
import { withRouter } from 'react-router-dom';
import Input from 'components/Utils/Forms/Input';


class GenreCreate extends Component {

    constructor(props){
        super(props);
        this.state = {
            genreChoices: [],
            name: '',
            description: '',
            parent: null,

            nonFieldErrors: [],
            nameErrors: []
        };
        this.onCreateGenre = this.onCreateGenre.bind(this);
    }

    componentDidMount(){
        listAllGenres().then((response) => {
            this.setState({
                genreChoices: response.data
            });
        });
    }

    onCreateGenre(){
        createGenre(this.state.name, this.state.description, this.state.parent).then((response) => {
            alert("Votre ajout a bien été pris en compte ! Un modérateur l'examinera dans les meilleurs délais.");
            this.props.history.push(getGenresUrl());
        }).catch((error) => {
            if (error.response.status === 400){
                this.setState({
                    nonFieldErrors: error.response.data.non_field_errors,
                    nameErrors: error.response.data.name
                });
            }
        });
    }

    render(){
        return (
            <div className="columns is-mobile is-multiline">
              <div className="column is-full">
                <section className="hero is-light">
                  <div className="hero-body">
                    <div className="container">
                      <h1 className="title is-size-1 has-text-centered">
                        Ajouter un genre
                      </h1>
                    </div>
                  </div>
                </section>
              </div>
              <div className="column is-12-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop">
                <div>

                  <div className="help is-danger is-size-5">{this.state.nonFieldErrors}</div>
                  
                  <Input
                    placeholder="Nom"
                    name="name"
                    value={this.state.name}
                    onChange={(e) => {this.setState({name: e.target.value});}}
                    errorMessages={this.state.nameErrors}
                  />
                  
                  <div className="field">
                    <div className="control">
                      <textarea
                        className="textarea"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={(e) => {this.setState({description: e.target.value});}}
                      ></textarea>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select onChange={(e) => {this.setState({parent: e.target.value});}}>
                          <option value={null}>Parent (optionnel)</option>
                          {this.state.genreChoices.map(
                              (genre) =>
                                  (<option value={genre.slug}>{genre.name}</option>)          
                          )}
                        </select>
                      </div>
                    </div>
                  </div>                                    

                <div className="field">
                  <div className="control">
                    <button
                      className="button is-info is-fullwidth"
                      onClick={this.onCreateGenre}
                    >Créer</button>
                  </div>
                </div>                  
                </div>
              </div>
            </div>
        );
    }
}


export default withRouter(GenreCreate);
