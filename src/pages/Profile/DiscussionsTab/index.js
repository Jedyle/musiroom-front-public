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
            page: 1,
            ordering: '-created'
        };
    }

    componentDidMount(){
        this.updateDiscussions(this.state.page);
    };

    componentDidUpdate(prevProps, prevState){
        if ((this.state.page !== prevState.page) || (prevProps.profile !== this.props.profile )){
            this.updateDiscussions(this.state.page);
        }
    }

    updateDiscussions(page){
        if (this.props.profile){
            getDiscussions(this.props.profile.user, page, this.state.ordering).then(
                (response) => {
                    console.log("discussions", response.data);
                    this.setState({
                        page: page,
                        discussions: response.data.results
                    });
                }
            );
        }
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
    
    render(){
        return (
            <div className="columns">
              <div className="column is-12-mobile is-9-desktop is-9-widescreen">
                <hr/>
                <h4 className="title is-4 has-text-centered">Discussions</h4>
                <hr/>
                <DiscussionsList discussions={this.formatDiscussions()}/>
              </div>
            </div>
        );
    }
    
}

export default DiscussionsTab;
