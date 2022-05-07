import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getListItemPositions, createListItem } from 'services/Lists';
import { search } from 'services/Search';
import { getAlbumUrl, getSearchUrl } from 'pages/urls';
import { previewUrl } from 'utils/urls';

import './style.css';

class SearchAlbum extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
            listItems: []
        };
    }

    componentDidMount(){
        this.fetchListItems();
    }

    fetchListItems(){
        let { list } = this.props;
        // gives list of all items in the list
        getListItemPositions(list.id).then((response) => {
            this.setState({
                listItems: response.data.map((res) => (res.album))
            });
        });        
    }
    
    fetchResults(query){
        search({
            model: 'album',
            query: query,
            method: "auto"
        }).then((response) => {
            this.setState({
                results: response.data
            });
        });
    }
    

    onChange = (e) => {
        let query = e.target.value;
        this.setState({query: query});
        if (query.length >= 3){
            this.fetchResults(query);
        }
        else{
            this.setState({results: []});
        }
    }

    albumIsInList = (album) => {
        return this.state.listItems.map((album) => (album.mbid)).includes(album.mbid);
    }

    addAlbumToList = (album) => {
        let { list, onAddAlbum } = this.props;
        createListItem({
            listId: list.id,
            albumId: album.mbid
        }).then((response) => {
            this.fetchListItems();
            onAddAlbum();
        });
    }

    render(){

        let { query, results } = this.state;

        return (
            <div>
              <div className="field">
                <p className="control">
                  <input
                    autoComplete="off"
                    className="input"
                    type="text"
                    placeholder="Search album"
                    name="query"
                    value={query}
                    onChange={this.onChange}
                  />
                </p>
                <p>Can't find an album ? {"  "}
                  <Link
                    to={getSearchUrl() + `?model=album&query=${query}`}
                    target="_blank" rel="noopener noreferrer"
                  >Advanced search</Link></p>
              </div>
              <div>
                {results.map((album) => (                    
                    <div className="box">
                      <article className="media">
                        <div className="media-left">
                          <figure className="image is-64x64">
                            <img src={previewUrl(album.preview)} alt="Preview"/>
                          </figure>
                        </div>                        
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <Link to={getAlbumUrl(album.mbid)}
                                    target="_blank"
                              >
                                {album.name}
                              </Link>
                            </p>
                            {
                                this.albumIsInList(album) ?
                                    (
                                        <button className="button is-small is-outlined is-success" disabled>
                                          in the list
                                        </button>
                                    ) : (
                                        <button className="button is-info is-small"
                                                onClick={() => this.addAlbumToList(album)}
                                        >
                                          add
                                        </button>
                                    )
                            }      
                          </div>
                        </div>
                      </article>
                    </div>
                ))}                
              </div>
            </div>
        );        
    }    
}

export default SearchAlbum;
