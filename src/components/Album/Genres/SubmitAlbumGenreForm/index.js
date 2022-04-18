import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createGenreUrl } from 'pages/urls';
import AutocompleteInput from 'components/Utils/Forms/Autocomplete';
import SwitchLogButton from 'components/Utils/LoginFilters/SwitchLogButton';


export default class SubmitAlbumGenreForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            autocompleteList: [],
            query: '',
            selectedItem: ''
        };
    }

    onChange = (event) => {
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

    onChooseItem = (index) => {
        console.log(index);
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

    onReset = (index) => {
        this.setState({
            selectedItem: ''
        });
    }
    
    render(){
        return (
            <div className="column is-full">
              <div className="columns">
                <div className="column is-12-mobile is-6-widescreen">
                  <p>Add a genre</p>
                  <br/>
                  <AutocompleteInput
                    placeholder="Pick a genre"
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
                  <SwitchLogButton
                    className="button is-info"
                    userRendering={
                        props => (
                            <button {...props}
                                    onClick={() => this.props.onSubmitAlbumGenre(this.state.selectedItem)}
                            >
                              Add {this.state.selectedItem && this.state.selectedItem.name}
                            </button>)
                    }
                    anonymousChildren={
                        <span>Add {this.state.selectedItem && this.state.selectedItem.name}</span>
                    }
                  />

                  <p>
                    You can't find a genre ? <Link to={createGenreUrl()}>Add it</Link> !
                  </p>                 
                </div>
              </div>
            </div>  
        );
    }
    
}
