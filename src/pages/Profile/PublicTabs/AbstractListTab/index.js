import React, { Component } from 'react';
import Paginator from 'components/Utils/Paginator';
import Filtrator from 'components/Utils/Filtrator';

class AbstractListTab extends Component {

    constructor(props){
        super(props);
        this.state = {
            albumTitleQuery: "",
            currentPage: 1,
            previousPageUrl: null,
            nextPageUrl: null,
            orderingIndex: 0,
            results: []
        };
        this.onPressEnter = this.onPressEnter.bind(this);
        this.onPreviousPage = this.onPreviousPage.bind(this);
        this.onNextPage = this.onNextPage.bind(this);
    }

    componentDidMount(){
        if (this.props.profile){
            this.fetchBaseElementsFromApi();
        }
    }

    componentDidUpdate(prevProps, prevState){
        if ((this.props.profile !== prevProps.profile) || (
            this.state.currentPage !== prevState.currentPage ||
                this.state.albumTitleQuery !== prevState.albumTitleQuery ||
                this.state.orderingIndex !== prevState.orderingIndex
        )){
            this.fetchBaseElementsFromApi();
        }
        
    }
    
    onPressEnter(event){
        this.setState({
            currentPage: 1,
            albumTitleQuery: event.target.value 
        });
    }

    onPreviousPage(){
        this.setState({
            currentPage: this.state.currentPage - 1 
        });
    }
    
    onNextPage(){
        this.setState({
            currentPage: this.state.currentPage + 1 
        });
    }

    fetchBaseElementsFromApi(){       
        this.props.fetchElements(
            {
                username: this.props.profile.user,
                page: this.state.currentPage,
                albumTitle: this.state.albumTitleQuery,
                ordering: this.props.orderingFields ? this.props.orderingFields[this.state.orderingIndex] : ''
            }
        ).then(
            (response) => {
                this.setState({
                    results: response.data.results,
                    previousPageUrl: response.data.previous,
                    nextPageUrl: response.data.next
                });
            }
        );
    }        
    
    render(){
        let ListComponent = this.props.ListComponent;
        return (
            <div className="columns is-multiline">
              <div className="column is-12">
                {this.props.header}
                <Paginator
                  currentPage={this.state.currentPage}
                  previousPageUrl={this.state.previousPageUrl}
                  nextPageUrl={this.state.nextPageUrl}
                  onPreviousPage={this.onPreviousPage}
                  onNextPage={this.onNextPage}
                />
                {this.props.orderingFields &&
                 <p className="select is-pulled-right has-padding-left-10 had-margin-top-10">
                   <select value={this.props.orderingFields[this.state.orderingIndex][0]}
                           onChange={(e) => {
                               this.setState(
                                   {
                                       orderingIndex: this.props.orderingFields.map(el => el[0]).indexOf(e.target.value),
                                       currentPage: 1
                                   }
                               );}}>
                     {this.props.orderingFields.map(
                         (ordering) => (
                             <option value={ordering[0]}>{ordering[1]}</option>
                         )
                         
                     )}
                   </select>
                 </p>                
                }
                <Filtrator
                  onPressEnter={this.onPressEnter}
                />
              </div>
              <div className="column is-12">
                <ListComponent
                  currentPage={this.state.currentPage}
                  results={this.state.results}
                  profile={this.props.profile}
                />
              </div>
            </div>
        );
    }
}

export default AbstractListTab;
