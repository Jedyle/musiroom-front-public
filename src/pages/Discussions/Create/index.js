import React, { Component } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import SubjectForm from 'containers/Discussions/SubjectForm';
import Title from 'components/Utils/Title';
import { trackAnalytics } from 'utils/track';

class DiscussionCreate extends Component {

    componentDidMount() {
        trackAnalytics();
    }

    render(){
        let query = queryString.parse(this.props.location.search);
        return (
            <div className="columns is-mobile has-padding-10">
              <Title title="New discussion"/>
                <SubjectForm
                  types={[
                      {
                          name: 'Album',
                          value: 'album'
                      },
                      {
                          name: 'Artist',
                          value: 'artist'
                      }
                  ]}
                  key={query.objectId + query.model}
                  objectId={query.objectId}
                  contentType={query.model}
                />
            </div>
        );
    }
}

export default withRouter(DiscussionCreate);
