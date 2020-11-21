import React, { Component } from 'react';
import queryString from 'query-string';
import { getLists } from 'services/Lists';
import { withRouter, Link } from 'react-router-dom';
import { profileUrl, getListUrl, listListsUrl } from 'pages/urls';
import Paginator from 'components/Utils/Paginator';

class ListsList extends Component {

    constructor(props) {
        super(props);
        let query = queryString.parse(props.location.search);
        this.state = {
            lists: [],
            page: parseInt(query.page) > 0 ? parseInt(query.page) : 1,
            ordering: query.ordering || "-vote_score",
            title: query.title || "",
            previousPageExists: false,
            nextPageExists: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.fetchLists();
    }

    fetchLists(){
        let { page, title, ordering } = this.state;
        getLists({
            page: page,
            title: title,
            ordering: ordering
        }).then((response) => {
            this.setState({
                lists: response.data.results,
                previousPageExists: response.data.previous,
                nextPageExists: response.data.next                
            });
        });
    }

    goToPage = (page, ordering, title) => {
        let search = `?page=${page}&ordering=${ordering}`;
        if (title !== ""){
            search += `&title=${title}`;
        }
        
        this.props.history.push({
            pathname: listListsUrl(),
            search: search
        });
    }

    handleSubmit(e){
        e.preventDefault();
        let {page, ordering, title} = this.state;
        this.goToPage(page, ordering, title);
    }

    getForm(){
        let {title, ordering} = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input
                        className="input"
                        type="text"
                        name="title"
                        placeholder="Titre"
                        value={title}
                        onChange={(e) => {this.setState({title: e.target.value});}}
                      />
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <div className="select">
                        <select
                          onChange={(e) => {this.setState({ordering: e.target.value});}}
                          p                      value={ordering}
                        >
                          <option value="-vote_score" >Les plus appréciées</option>
                          <option value="-modified">Dernières modifications</option>
                        </select>
                      </div>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <button
                        className="button is-primary"
                        type="submit">Rechercher</button>
                    </p>
                  </div>
                </div>
              </div>
            </form>
        );
    }

    
    render() {
        let { lists, previousPageExists, nextPageExists, page, ordering, title } = this.state;
        let paginator = (
            <Paginator
              previousPageUrl={previousPageExists}
              nextPageUrl={nextPageExists}
              onPreviousPage={() => this.goToPage(page - 1, ordering, title)}
              onNextPage={() => this.goToPage(page + 1, ordering, title)}
            />
        );
        return (
            <div className="columns is-mobile has-padding-10">
              <div className="column is-12-mobile is-8-tablet is-offset-2-tablet">

                <section className="hero mb-5">
                  <div className="hero-body has-background-grey-lighter">
                    <div className="container">
                      <h1 className="title has-text-centered">
                        Listes
                      </h1>
                    </div>
                  </div>
                </section>

                <div className="columns is-mobile">
                  <div className="column is-12-mobile is-8-tablet is-offset-2-tablet">
                    {this.getForm()}                                        
                  </div>                                   
                </div>
                
                <div className="columns is-mobile">
                  <div className="column">                    
                    {paginator}

                    <table className="table" style={{width: '100%'}}>
                      <tbody>
                        <tr>
                          <th>Listes</th>
                        </tr>
                        {lists.map((list) => (
                            <tr>
                              <td>
                                <Link to={getListUrl(list.id)}>
                                  {list.title}
                                </Link>                                
                                {" "}
                                (liste de {" "}
                                <Link to={profileUrl(list.user.username)}>
                                  {list.user.username}
                                </Link>
                                )
                                <p className="is-pulled-right">
                                  <span className="icon">
                                    <i className="fa fa-heart"></i>
                                  </span>
                                  {list.vote_score}
                                </p>
                              </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>                   
                    {paginator}
                  </div>                 
                </div>
              </div>
            </div>
        );
    }
}

export default withRouter(ListsList);
