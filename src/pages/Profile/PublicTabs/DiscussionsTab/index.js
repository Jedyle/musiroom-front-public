import React, { Component } from 'react';
import { getDiscussions } from 'services/Profile';
import { Link } from 'react-router-dom';
import { getDiscussionType } from 'services/Discussions';
import { getDiscussionUrl, getDiscussionsUrlForObject} from 'pages/urls';
import DiscussionsList from 'components/Profile/Discussions/DiscussionsList';

class DiscussionsTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            discussions: [],
            currentPage: 1,
            nextPageUrl: null,
            previousPageUrl: null,
            ordering: '-created'
        };
    }

    componentDidMount(){
        if (this.props.profile){
            this.updateDiscussions();
        }
    };

    componentDidUpdate(prevProps, prevState){
        if ((this.state.currentPage !== prevState.currentPage) || (prevProps.profile !== this.props.profile )){
            this.updateDiscussions(this.state.currentPage);
        }
    }

    updateDiscussions(){
        getDiscussions(this.props.profile.user, this.state.currentPage, this.state.ordering).then(
            (response) => {
                this.setState({
                    discussions: response.data.results,
                    previousPageUrl: response.data.previous,
                    nextPageUrl: response.data.next
                });
            }
        );
    }

    formatDiscussions(){
        return this.state.discussions.map(
            (discussion) => (
                <span>
                  <Link to={getDiscussionUrl(discussion.id)}>
                    <strong>
                      {discussion.title}
                    </strong>
                  </Link> ({
                      (<Link to={getDiscussionsUrlForObject(discussion.content_type, discussion.object_id)}>
                         {getDiscussionType(discussion)}
                       </Link>)
                  })
                </span>
            )
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

    render(){
        return (
            <div className="columns">
              <div className="column is-12-mobile is-9-desktop is-9-widescreen">
                <hr/>
                <p className="title is-4 has-text-centered">Discussions</p>
                <hr/>
                <a
                  className="pagination-previous"
                  disabled={!this.state.previousPageUrl}
                  onClick={() => this.previousPage()}
                > {"<"} </a>
                <a
                  className="pagination-next"
                  disabled={!this.state.nextPageUrl}
                  onClick={() => this.nextPage()}
                >{">"}</a>
                <DiscussionsList discussions={this.formatDiscussions()}/>
              </div>
            </div>
        );
    }

}

export default DiscussionsTab;
