import React, { Component } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import SubjectForm from 'components/Discussions/SubjectForm';

class DiscussionCreate extends Component {

    render(){
        let query = queryString.parse(this.props.location.search);
        return (
            <div className="columns is-mobile has-padding-10">
                <SubjectForm
                  types={[
                      {
                          name: 'Album',
                          value: 'album'
                      },
                      {
                          name: 'Artiste',
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