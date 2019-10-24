import React, { Component } from 'react';
import { getDiscussions } from 'services/Profile';
import { Link } from 'react-router-dom';
import { getDiscussionType, getDiscussionLink, getDiscussionLinkForContentType} from 'services/Discussions';
import DiscussionsList from 'components/Profile/Discussions/DiscussionsList';

class DiscussionsTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            discussions: [],
            currentPage: 1,
            nextPage: null,
            previousPage: null,
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
                    previousPage: response.data.previous,
                    nextPage: response.data.next
                });
            }
        );
    }

    

    formatDiscussions(){
        return this.state.discussions.map(
            (discussion) => (
                <span>
                  <Link to={getDiscussionLink(discussion)}>
                    <strong>
                      {discussion.title}
                    </strong>
                  </Link> ({
                      (<Link to={getDiscussionLinkForContentType(discussion.content_type)}>
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
                <h4 className="title is-4 has-text-centered">Discussions</h4>
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
                <DiscussionsList discussions={this.formatDiscussions()}/>
              </div>
            </div>
        );
    }
    
}

export default DiscussionsTab;
