import React, { Component } from 'react';
import { getGenre } from 'services/Genres';
import GenreTree from 'components/Genre/Tree';
import { CreateGenreLink } from 'pages/Links';

class GenreRetrieve extends Component  {

    constructor(props){
        super(props);
        this.state = {
            genre: null
        };
    }

    componentDidMount(){
        getGenre(this.props.genreSlug).then((response) => {
            this.setState({
                genre: response.data 
            });
        });
    }
    
    render(){
        let genre = this.state.genre;
        return genre && (
            <div className="columns is-mobile is-multiline">
              <div className="column is-full">
                <section className="hero is-light">
                  <div className="hero-body">
                    <div className="container">
                      <h1 className="title is-size-1 has-text-centered">
                        {genre.name}
                      </h1>
                    </div>
                  </div>
                </section>               
              </div>              
              <div className="column is-10-mobile is-offset-1-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop">
                <p style={{textAlign: 'justify'}}>
                  {genre.description}
                </p>
                <br/>
                <div className="columns is-mobile is-multiline">                  
                  <div className="column is-full-mobile is-full-tablet is-half-desktop">
                    Top 10
                  </div>
                  <div className="column is-full-mobile is-full-tablet is-half-desktop">
                    {genre.children.length > 0 && 
                     (<>
                        <h1 className="title is-size-4 has-text-centered">Sous-genres</h1>
                        <GenreTree
                          genres={genre.children}
                          initShowChildren={true}
                        />
                      </>
                     )
                    }
                    <p className="has-text-centered mb-3">
                      <CreateGenreLink
                        className="button is-light"
                        title="Ajouter un genre"
                      />
                      <br/>
                    </p>
                  </div>                  
                </div>
              </div>
            </div>);
    }
}

export default GenreRetrieve;
