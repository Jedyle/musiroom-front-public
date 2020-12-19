import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ArtistSidebar from 'components/Artist/Sidebar';
import { getArtist } from 'services/Artists';
import { getDiscussionsUrlForObject, discussionCreateOnTopicUrl } from 'pages/urls';
import ArtistBody from './body';
import Title from 'components/Utils/Title';

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
        let { artist } = this.state;
        return (
            <div className="columns is-multiline is-marginless is-paddingless">
              <div className="column is-12-mobile is-3-desktop">
                {
                    artist && (
                        <>
                          <Title title={artist.name}/>
                          <ArtistSidebar
                            {...artist}
                          />
                          <hr/>
                          <span>
                            <Link
                              className="button is-medium has-margin-top-5 is-fullwidth is-info"
                              to={getDiscussionsUrlForObject('artist', artist.id)}
                            >Discussions sur {artist.name}</Link>
                            <Link
                              className="button is-medium has-margin-top-5 is-fullwidth is-success"
                              to={discussionCreateOnTopicUrl('artist', artist.id)}
                            >Nouvelle discussion</Link>
                          </span>
                        </>
                    )                
                }
              </div>
              <div className="column is-12-mobile is-7-widescreen has-padding-left-30">          
                { artist &&
                  (
                      <ArtistBody
                        artist={artist}
                      />)
                }
              </div>
            </div>
        );              
    }
}

export default ArtistDetails;
