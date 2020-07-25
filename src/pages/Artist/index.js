import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ArtistSidebar from 'components/Artist/Sidebar';
import { getArtist } from 'services/Artists';
import { getDiscussionsUrlForObject, discussionCreateOnTopicUrl } from 'pages/urls';
import ArtistBody from './body';

class ArtistDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
            artist: null  
        };
    }

    componentDidMount(){
        this.fetchArtist();
    }

    fetchArtist(){
        getArtist(this.props.match.params.mbid).then((response) => {
            this.setState({
                artist: response.data
            });
        });      
    }
    
    render() {
        return (
            <div className="columns is-multiline is-marginless is-paddingless">
              <div className="column is-12-mobile is-3-desktop">
                {
                    this.state.artist && (
                        <>
                        <ArtistSidebar
                          {...this.state.artist}
                        />
                          <hr/>
                          <span>
                            <Link
                              className="button is-medium has-margin-top-5 is-fullwidth is-info"
                              to={getDiscussionsUrlForObject('artist', this.state.artist.id)}
                            >Discussions sur {this.state.artist.name}</Link>
                            <Link
                              className="button is-medium has-margin-top-5 is-fullwidth is-success"
                              to={discussionCreateOnTopicUrl('artist', this.state.artist.id)}
                            >Nouvelle discussion</Link>
                          </span>
                        </>
                    )                
                }
              </div>
              <div className="column is-12-mobile is-7-widescreen has-padding-left-30">          
                { this.state.artist &&
                  (
                      <ArtistBody
                        artist={this.state.artist}
                      />)
                }
              </div>
            </div>
        );              
    }
}

export default ArtistDetails;
