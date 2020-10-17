import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAlbumUrl, createGenreUrl } from 'pages/urls';
import { getAlbumGenres, voteOnAlbumGenre, addAlbumGenre } from 'services/Albums';
import { listAllGenres } from 'services/Genres';
import AutocompleteInput from 'components/Utils/Forms/Autocomplete';

class SubmitAlbumGenreForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            autocompleteList: [],
            query: '',
            selectedItem: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onChooseItem = this.onChooseItem.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onChange(event){
        let autocompleteList = [];
        let query = event.target.value; 
        if (query.length > 0){
            autocompleteList = this.props.genres.slice().filter((obj) => (obj.name.toLowerCase().includes(query)));
        }
        this.setState({
            query: query,
            autocompleteList: autocompleteList
        });
    }

    onChooseItem(index){
        this.setState((prevState) => {
            return (
                {
                    selectedItem: prevState.autocompleteList[index],
                    autocompleteList: [],
                    query: ''
                }
            );
        });
    }

    onReset(index){
        this.setState({
            selectedItem: ''
        });
    }
    
    render(){
        return (
            <div className="column is-full">
              <div className="columns">
                <div className="column is-12-mobile is-6-widescreen">
                  <p>Ajouter un genre</p>
                  <br/>
                  <AutocompleteInput
                    placeholder="Choisissez un genre"
                    name="genre"
                    value={this.state.query}
                    onChange={this.onChange}
                    autocompleteList={this.state.autocompleteList.map((obj) => (obj.name))}
                    onChooseItem={this.onChooseItem}
                    onBlur={() => {this.setState({autocompleteList: []});}}
                  />
                  {this.props.errors.length > 0 && (
                      <>
                        <p className="help is-danger">
                          {this.props.errors}
                        </p>
                        <br/>
                      </>
                  )}                  
                  {
                      this.state.selectedItem &&
                          (                              
                              <span className="tag is-light is-success is-large mr-5">
                                {this.state.selectedItem.name}
                                <button className="delete is-small" onClick={this.onReset}></button>
                              </span>
                          )
                  }
                  <button className="button is-info"
                          onClick={() => this.props.onSubmitAlbumGenre(this.state.selectedItem)}
                  >Ajouter {this.state.selectedItem && this.state.selectedItem.name}</button>

                  <p>
                    Vous ne trouvez pas un genre musical ? <Link to={createGenreUrl()}>Ajoutez-le</Link> !
                  </p>                 
                </div>
              </div>
            </div>  
        );
    }
    
}

const VoteOnGenres = ({genres, onVote}) => (
    <div>
      <h1 className="title">Genres</h1>
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical">
          {genres.map((genre, index) => (
              <div className="tile is-child notification is-grey" key={index}>
                <h1 className="title is-6 is-marginless">
                  {genre.genre_details.name}              
                </h1>
                <p>Score: {genre.vote_score}</p>
                <p className="buttons">
                  <button className={`button ${genre.user_vote === "up" && "is-success"}`}
                          disabled={genre.user_vote === "up"}
                          onClick={() => onVote(index, genre.genre_details.slug, "up")}
                  >
                    <span className="icon is-small">
                      <i className="fa fa-plus"></i>
                    </span>
                    <small>({genre.num_vote_up})</small>
                  </button>
                  <button className={`button ${genre.user_vote === "down" && "is-danger"}`}
                          disabled={genre.user_vote === "down"}
                          onClick={() => onVote(index, genre.genre_details.slug, "down")}
                  >
                    <span className="icon">
                      <i className="fa fa-minus"></i>                    
                    </span>
                    <small>({genre.num_vote_down})</small>
                  </button>
                  <button className="button"
                          disabled={!genre.user_vote}
                          onClick={() => onVote(index, genre.genre_details.slug, "null")}
                  >
                    Annuler
                  </button>
                  <button className="button">
                    Signaler
                  </button>
                </p>
              </div>
          ))}
        </div>
      </div>
    </div>
);

export default class AlbumGenresPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            genres: [],
            genreChoices: [],
            submitGenreErrors: []
        };
        this.onVote = this.onVote.bind(this);
        this.onSubmitAlbumGenre = this.onSubmitAlbumGenre.bind(this);
    }

    fetchAlbumGenres(){
        getAlbumGenres(this.props.album.mbid).then((response) => {
            this.setState({
                genres: response.data
            });
        });
    }
    
    componentDidMount(){
        this.fetchAlbumGenres();
        listAllGenres().then((response) => {
            this.setState({
                genreChoices: response.data
            });
        });
    }

    onVote(index, slug, vote){
        voteOnAlbumGenre(this.props.album.mbid, slug, vote).then((response) => {
            let genres = this.state.genres.slice();
            genres[index] = response.data;
            this.setState({
                genres: genres
            });
        });
    }

    onSubmitAlbumGenre(item){
        addAlbumGenre(this.props.album.mbid, item.slug).then((response) => {
            this.fetchAlbumGenres();
        }).catch((err) => {
            console.log(err.response);
            if (err.response.status === 400){
                this.setState({
                    submitGenreErrors: err.response.data.genre
                });
            }
        });
    }
    
    render(){
        return(
            <div className="columns is-multiline">
              <Link to={getAlbumUrl(this.props.album.mbid)}>
                {"< "} Retour à l'album
              </Link>
              <SubmitAlbumGenreForm
                album={this.props.album}
                genres={this.state.genreChoices}
                onSubmitAlbumGenre={this.onSubmitAlbumGenre}
                errors={this.state.submitGenreErrors}
              />
              
              <VoteOnGenres album={this.props.album}
                            genres={this.state.genres}
                            onVote={this.onVote}
              />             
            </div>
        );
    }
    
}
