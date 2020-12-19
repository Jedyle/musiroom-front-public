import React, { Component } from 'react';
import { PrivateRouteRender } from 'pages/Router/PrivateRoute';
import { listConversationsUrl, getConversationUrl } from 'pages/urls';
import Title from 'components/Utils/Title';

import ConversationsList from './List';
import ConversationRetrieve from './Retrieve';
import ConversationCreate from './Create';

export default class Conversations extends Component {
    render() {
        return (
            <div className="columns is-mobile is-multiline">
              <div className="column is-12-mobile is-3-tablet">
                <ConversationCreate/>
                <ConversationsList/>
              </div>
              <div className="column is-12-mobile is-9-tablet">
                <PrivateRouteRender
                  exact path={listConversationsUrl()}
                  render={(props) => <div className="column">
                                       <Title title="Messagerie"/>
                                     </div>}
                />
                <PrivateRouteRender
                  exact path={getConversationUrl(":convId(\\d+)")}
                  render={(props) => <ConversationRetrieve
                                       id={props.match.params.convId}
                                       key={props.match.params.convId}
                                     />}
                />
              </div>
            </div>
        );
    }
}
