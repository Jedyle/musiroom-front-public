import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroller";

import ActivityItem from 'components/Activity/Item';
import { getAllActivity, getSelfActivity } from 'services/Activity';
import { getAllActivityUrl, getSelfActivityUrl } from 'pages/urls';
import HeadLine from 'components/Utils/HeadLine';

export default class Activity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            hasMore: true,
            count: 0
        };
    }      

    fetchActivity = (page) => {
        let getActivity = this.props.type === "all" ? getAllActivity : getSelfActivity;
        getActivity({page: page}).then((response) => {
            this.setState((prevState) => {
                return {
                    results: prevState.results.concat(response.data.results),
                    hasMore: response.data.next !== null,
                    count: response.data.count
                };
            });
        });
    }
    
    render() {
        let { type } = this.props;
        let { hasMore, results } = this.state;
        return (
            <div>
              <div className="columns is-mobile is-multiline">
                <div className="column is-12">
                  <br/>
                  <HeadLine
                    heroClasses="has-background-primary"
                    title={`Activité ${type === "all" ? "(tout)" : "(perso)"}`}
                    titleClasses="is-size-1 has-text-white"
                  />
                </div>

                <div className="column is-12-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop has-background-white-ter">

                  <p className="has-text-centered">
                    <Link className="button" to={type === "all" ? getSelfActivityUrl() : getAllActivityUrl()}>{type === "all" ? "Voir mon flux personalisé" : "Voir tout l'historique"}</Link>
                    <br/>
                    <br/>
                  </p>                  

                  <InfiniteScroll
                    key={type}
                    pageStart={0}
                    loadMore={this.fetchActivity}
                    hasMore={hasMore}
                    loader={<h4>Chargement...</h4>}
                  >
                    <div className="list">
                      {results.map((result) => (
                          <ActivityItem {...result}/>
                      ))}
                    </div>                   
                  </InfiniteScroll>
                  
                </div>
                
              </div>
            </div>
        );
    }
}
