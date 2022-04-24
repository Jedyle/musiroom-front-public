import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { getAlbum } from 'services/Albums';
import DetailsPage from './Details';
import AlbumGenresPage from './Genres';
import CreateReview from './Review/Create';
import RetrieveUpdateReview from './Review/RetrieveUpdate';
import { getAlbumGenresUrl, createReviewUrl, getReviewUrl, getDiscussionsUrlForObject } from 'pages/urls';
import { CreateDiscussionLink } from 'containers/Links';
import AlbumSidebar from 'components/Album/Sidebar';
import TrackList from 'components/Album/TrackList';

const ExtendedSidebar = ({album}) => (
    <>
      <AlbumSidebar
        {...album}
      />
      <span>
        <Link
          to={getDiscussionsUrlForObject('album', album.id)}
          className="button is-medium has-margin-top-5 is-fullwidth is-info">Discussions on {album.title}</Link>

        <CreateDiscussionLink
          className="button is-medium has-margin-top-5 is-fullwidth is-success"
          title="New discussion"
          contentType="album"
          objectId={album.id}
        />
        
      </span>
      <hr/>
      <h3 className="is-size-5">Tracks</h3>
      <TrackList
        tracks={album.mbid ? album.tracks.track_list : []}
      />
    </>
);


class AlbumDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
            album: null            
        };
    }

    componentDidMount(){
        this.fetchAlbum();
    }

    fetchAlbum(){
        getAlbum(this.props.match.params.mbid).then(
            (response) => {
                this.setState(
                    {
                        album: response.data
                    }
                );
            }
        );        
    }
    
    render(){
        if (this.state.album){
            return (
                <div className="columns is-multiline is-marginless is-paddingless">
                  <div className="column is-12-mobile is-3-desktop">
                    <ExtendedSidebar album={this.state.album}/>                  
                  </div>
                  <div className="column is-12-mobile is-9-desktop has-padding-left-30">
                    <Route
                      exact
                      path={this.props.match.url}
                      render={(props) => <DetailsPage {...props}
                                                      album={this.state.album}
                                         />}
                    />
                    <Route exact
                           path={getAlbumGenresUrl(this.state.album.mbid)}
                           render={(props) => <AlbumGenresPage {...props}
                                                               album={this.state.album}/>
                                  }
                    />
                    <Route exact
                           path={createReviewUrl(this.state.album.mbid)}
                           render={(props) => <CreateReview {...props}
                                                            album={this.state.album}
                                              />}
                    />
                    <Route exact
                           path={getReviewUrl(this.state.album.mbid, ":reviewId")}
                           render={(props) => <RetrieveUpdateReview {...props}
                                                              album={this.state.album}
                                              />}
                      
                    />
                  </div>
                </div>
            );
        }
        return (<div></div>);
    }
}

export default AlbumDetails;
