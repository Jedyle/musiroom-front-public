import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroller";

import ActivityItem from 'components/Activity/Item';
import { getAllActivity, getSelfActivity } from 'services/Activity';
import { getAllActivityUrl, getSelfActivityUrl } from 'pages/urls';
import HeadLine from 'components/Utils/HeadLine';
import Title from 'components/Utils/Title';
import Avatar from 'components/Profile/Avatar';
import ActivityStatement from 'components/Activity/Statement';
import { UserLink } from 'containers/Links';
import ActionObject from 'containers/Activity/ActionObject';

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
              <Title title={type === "all" ? "Full" : "My followees"}/>
              <div className="columns is-mobile is-multiline">
                <div className="column is-12">
                  <br/>
                  <HeadLine
                    heroClasses="has-background-primary"
                    title={`Activity ${type === "all" ? "(all)" : "(personal)"}`}
                    titleClasses="is-size-1 has-text-white"
                  />
                </div>

                <div className="column is-12-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop has-background-white-ter">

                  <p className="has-text-centered">
                    <Link className="button" to={type === "all" ? getSelfActivityUrl() : getAllActivityUrl()}>{type === "all" ? "View personal stream" : "View all history"}</Link>
                    <br/>
                    <br/>
                  </p>                  

                  <InfiniteScroll
                    key={type}
                    pageStart={0}
                    loadMore={this.fetchActivity}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                  >
                    <div className="list">
                      {results.map((result) => (
                          <ActivityItem
                            activityMedia={
                                <Avatar
                                  avatar={result.actor.avatar}
                                  size="is-64x64"
                                  alt={`User ${result.actor.name}`}
                                />}
                            activityStatement={
                                <ActivityStatement
                                  actorComponent={
                                      <UserLink username={result.actor.name}/>
                                  }
                                  verb={result.verb}
                                  actionObjectComponent={
                                      <ActionObject
                                        contentType={result.action_object_content_type}
                                        object={result.action_object}
                                      />
                                  }
                                />
                            }
                            timestamp={result.timestamp}
                          />
                      ))}
                    </div>                   
                  </InfiniteScroll>
                  
                </div>
                
              </div>
            </div>
        );
    }
}
