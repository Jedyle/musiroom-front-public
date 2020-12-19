import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { search, searchUsers } from 'services/Search';
import { getSearchUrl } from 'pages/urls';
import Paginator from 'components/Utils/Paginator';
import AlbumSearch from 'components/Search/Album';
import ArtistSearch from 'components/Search/Artist';
import UserSearch from 'components/Search/User';
import Title from 'components/Utils/Title';

class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            results: null,
            hasNextPage: false
        };
        this.onChangePage = this.onChangePage.bind(this);
    }

    fetchData(){
        switch(this.props.model){
        case 'album':
            return this.fetchAlbums();
        case 'artist':
            return this.fetchArtists();
        case 'user':
            return this.fetchUsers();
        default:
            return null;
        }
    }

    fetchAlbums(){
        return search({
            model: "album",
            query: this.props.query,
            method: "advanced",
            page: this.props.page
        }).then((response) => {
            this.setState({
                results: response.data.results,
                hasNextPage: response.data.num_pages > response.data.page
            });
        }).catch((error) => {
            if (error.response.status === 400){
                this.props.history.push("/");
            }
        });;
    }

    fetchArtists(){
        return search({
            model: "artist",
            query: this.props.query,
            method: "advanced",
            page: this.props.page
        }).then((response) => {
            this.setState({
                results: response.data.results,
                hasNextPage: response.data.num_pages > response.data.page
            });
        }).catch((error) => {
            if (error.response.status === 400){
                this.props.history.push("/");
            }
        });;
    }

    fetchUsers(){
        return searchUsers({
            query: this.props.query,
            page: this.props.page
        }).then((response) => {
            this.setState({
                results: response.data.results,
                hasNextPage: response.data.next
            });
        }).catch((error) => {
            if (error.response.status === 400){
                this.props.history.push("/");
            }
        });;
    }

    componentDidMount(){
        this.fetchData();       
    }

    onChangePage(newPage){
        this.props.history.push({
            pathname: getSearchUrl(),
            search: `?model=${this.props.model}&query=${this.props.query}&page=${newPage}`
        });
    }
    
    render(){
        let components = {
            album: AlbumSearch,
            artist: ArtistSearch,
            user: UserSearch
        };
        let SearchResults = components[this.props.model];
        let paginator = (
            <Paginator
              currentPage={this.props.page}
              previousPageUrl={this.props.page > 1}
              nextPageUrl={this.state.hasNextPage}
              onPreviousPage={() => this.onChangePage(parseInt(this.props.page)-1)}
              onNextPage={() => this.onChangePage(parseInt(this.props.page)+1)}
            />
        );
        return this.state.results && (
            <div className="columns is-mobile is-multiline">
              <Title title={`Résultats pour ${this.props.query}`}/>
              <div className="column is-12-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop">
                <div className="container">
                  <h1 className="title has-text-centered">Résultats pour {this.props.query}</h1>
                  <p className="has-text-centered">
                    {paginator}
                  </p>
                  <br/>
                  <SearchResults
                    results={this.state.results}
                  />
                  <p className="has-text-centered">
                    {paginator}
                  </p>
                </div>
              </div>
            </div>
        );
    }
    
}

export default withRouter(Search);
