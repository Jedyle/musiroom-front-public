import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAlbumUrl } from 'pages/urls';
import { getAlbumGenres, voteOnAlbumGenre, addAlbumGenre } from 'services/Albums';
import { listAllGenres } from 'services/Genres';
import SubmitAlbumGenreForm from 'components/Album/Genres/SubmitAlbumGenreForm';
import VoteAlbumGenre from 'components/Album/Genres/VoteAlbumGenre';
import Title from 'components/Utils/Title';

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
              <Title title={"Genres de " + this.props.album.title}/>
              <Link to={getAlbumUrl(this.props.album.mbid)}>
                {"< "} Retour à l'album
              </Link>
              <SubmitAlbumGenreForm
                album={this.props.album}
                genres={this.state.genreChoices}
                onSubmitAlbumGenre={this.onSubmitAlbumGenre}
                errors={this.state.submitGenreErrors}
              />
              
              <VoteAlbumGenre album={this.props.album}
                            genres={this.state.genres}
                            onVote={this.onVote}
              />             
            </div>
        );
    }
    
}
