import React, { Component } from 'react';
import { getSearchUrl, getAlbumUrl, getArtistUrl } from 'pages/urls';
import { search } from 'services/Search';
import { withRouter } from 'react-router-dom';
import AutoCompleteInput from 'components/Utils/Forms/Autocomplete';

class SearchInput extends Component {

    choices = {
        album: 'Album',
        artist: 'Artist',
        user: 'User'
    }
    
    constructor(props){
        super(props);
        this.state = {
            query: '',
            type: 'album',
            autocompleteList: [],
            autocompleteData: []
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeQuery = this.onChangeQuery.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChooseItem = this.onChooseItem.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    reset(type){
        this.setState({
            query: '',
            type: type,
            autocompleteData: [],
            autocompleteList: []            
        });
    }

    onSubmit(e){
        e.preventDefault();
        this.props.history.push({
            pathname: getSearchUrl(),
            search: `?model=${this.state.type}&query=${this.state.query}`
        });
        this.reset(this.state.type);
    }

    fetchAutocompleteValues(query){
        if (this.state.type === 'user'){
            return;
        }
        search({
            model: this.state.type,
            query: query,
            method: 'auto'            
        }).then((response) => {
            this.setState({
                autocompleteList: response.data.slice(0, 4).map((res) => (
                    <div>{res.name}</div>
                )),
                autocompleteData: response.data.slice(0, 4)
            });
        });
    }

    onChangeQuery(event){
        this.setState({
            query: event.target.value
        });
        if (event.target.value.length > 2){
            this.fetchAutocompleteValues(event.target.value);
        }
        else {
            this.setState({
                autocompleteList: [] 
            });
        }
    }

    onChangeType(event){
        this.setState({
            type: event.target.value
        });
    }

    onChooseItem(index){
        let item = this.state.autocompleteData[index];
        let url = this.state.type === "album" ? getAlbumUrl(item.mbid) : getArtistUrl(item.mbid); 
        this.props.history.push(url);
        this.reset(this.state.type);   
    }

    onBlur(){
        this.setState({
            autocompleteData: [],
            autocompleteList: []
        });
    }
    
    render(){
        return (
            <form onSubmit={this.onSubmit} autocomplete="off">
              <AutoCompleteInput
                name="query"
                placeholder="Search..."
                value={this.state.query}
                onChange={this.onChangeQuery}
                additionalFieldClasses="has-addons mb-0"
                additionalControlElements={
                    <p className="control">
                      <span className="select">
                        <select onChange={this.onChangeType}>
                          {Object.keys(this.choices).map((choice) => (
                              <option value={choice}>{this.choices[choice]}</option>
                          ))}
                        </select>
                      </span>
                    </p>                    
                }
                autocompleteList={this.state.autocompleteList}
                onChooseItem={this.onChooseItem}
                onBlur={this.onBlur}
              />
            </form>
        )
        ;
    }   
}

export default withRouter(SearchInput);
