import React, { Component } from 'react';
import { getListUrl } from 'pages/urls';
import { getLists } from 'services/Profile';
import { Link } from 'react-router-dom';
import AbstractList from 'components/Utils/AbstractList';

class ListsTabs extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            previousPage: null,
            nextPage: null,
            lists: []
        };
    }

    componentDidMount(){
        if (this.props.profile){
            this.fetchLists(this.state.currentPage);
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.profile !== prevProps.profile || (this.state.currentPage !== prevState.currentPage)){
            this.fetchLists(this.state.currentPage);
        }
    }

    fetchLists(page=1){
        getLists(this.props.profile.user, page).then(
            (response) => {
                this.setState({
                    lists: response.data.results,
                    currentPage: page,
                    nextPage: response.data.next,
                    previousPage: response.data.previous
                });
            }
        );
    }

    previousPage(){
        this.setState({
            currentPage: this.state.currentPage - 1 
        });
    }
    
    nextPage(){
        this.setState({
            currentPage: this.state.currentPage + 1 
        });
    }
    
    renderLists(){
        return this.state.lists.map(
            (list) => {
                return (
                    <span>
                      <Link to={getListUrl(list.id)}>
                        {list.title}
                      </Link> ({list.album_count === 1 ? "1 album" : list.album_count + " albums"})
                    </span>
                );
            }  
        );
    }

    render(){
        return (
            <div className="columns">
              <div className="column is-12-mobile is-9-desktop is-9-widescreen">
                <hr/>
                <h4 className="title is-4 has-text-centered">Lists</h4>
                <hr/>
                <a
                  className="pagination-previous"
                  disabled={!this.state.previousPage}
                  onClick={() => this.previousPage()}
                > {"<"} </a>
                <a
                  className="pagination-next"
                  disabled={!this.state.nextPage}
                  onClick={() => this.nextPage()}
                >{">"}</a>
                <br/>
                <AbstractList items={this.renderLists()}/>
              </div>
            </div>
        );        
    }
}

export default ListsTabs;
