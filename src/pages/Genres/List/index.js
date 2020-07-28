import React, { Component } from 'react';
import GenreTree from 'components/Genre/Tree';
import { getGenres } from 'services/Genres';
import { Link } from 'react-router-dom';
import { createGenreUrl } from 'pages/urls';

export default class GenreList extends Component {

    constructor(props){
        super(props);
        this.state = {
            genres: []
        };
    }

    componentDidMount(){
        getGenres().then((response) => {
            this.setState({
                genres: response.data
            });
        });
    }

    render() {
        return (
            <div className="columns is-mobile is-multiline">
              <div className="column is-12-mobile is-offset-3-tablet is-6-tablet">
                <h1 className="title has-text-centered">Genres</h1>
                <p className="has-text-centered mb-3">
                  <Link to={createGenreUrl()}>Ajouter un genre</Link>
                  <br/>
                </p>
                <GenreTree genres={this.state.genres} />
              </div>              
            </div>
        );
    }
}
