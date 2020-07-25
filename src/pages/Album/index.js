import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from 'services/Auth/api';
import { getAlbum } from 'services/Albums';
import AlbumSidebar from 'components/AlbumDetails/Sidebar';
import TrackList from 'components/AlbumDetails/TrackList';
import RatingActions from './ratingActions';
import ReviewsPanel from './reviews';
import { GeneralStats, FolloweesStatsPanel } from './albumStats';
import AlbumYoutubeLink from './youtubeLink';
import AlbumsFromSameArtist from './fromSameArtist';
import { getDiscussionsUrlForObject, discussionCreateOnTopicUrl } from 'pages/urls';

const PleaseSubmitGenreMessage = ({
    album
}) => (
    <article className="message is-info">
      <div className="message-header">
        <p>Quel est le genre de cet album ?</p>
      </div>
      <div className="message-body">
        Cet album n'a pas encore de genre(s) attitré(s). Prenez 5 secondes pour
        {"  "}
        <a>proposer un genre</a>
        {"  "}
        pour cette oeuvre ! 
      </div>
    </article>
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
                    <AlbumSidebar
                      {...this.state.album}
                    />
                    <span>
                      <Link
                        to={getDiscussionsUrlForObject('album', this.state.album.id)}
                        className="button is-medium has-margin-top-5 is-fullwidth is-info">Discussions sur {this.state.album.title}</Link>
                      <Link
                        to={discussionCreateOnTopicUrl('album', this.state.album.id)}
                        className="button is-medium has-margin-top-5 is-fullwidth is-success">Nouvelle discussion</Link>
                    </span>
                    <hr/>
                    <h3 className="is-size-5">Pistes</h3>
                    <TrackList
                      tracks={this.state.album.mbid ? this.state.album.tracks.track_list : []}
                    />                
                  </div>
                  <div className="column is-12-mobile is-9-desktop has-padding-left-30">
                    <div className="columns is-multiline">
                      <div className="column is-12-mobile is-8-desktop">
                        <h1 className="title is-size-2">{this.state.album.title}</h1>
                        <RatingActions
                          rating={this.state.album.rating.id}
                          albumMbid={this.state.album.mbid}
                          starDimension="30px"
                          starSpacing="4px"
                        />
                      </div>
                      <div className="column is-6-mobile is-4-desktop is-3-widescreen is-offset-1-widescreen has-margin-top-20">
                        <GeneralStats
                          album={this.state.album}
                        />
                      </div>
                      <div className="column is-12-mobile is-9-desktop">
                        <hr/>
                        {
                            this.state.album.genres.length === 0 ?
                                <PleaseSubmitGenreMessage/> : ""
                        }
                        <br/>
                        <ReviewsPanel
                          album={this.state.album}
                        />
                      </div>
                      <div className="column is-3">
                        { getUser() && (
                            <>
                              <br/>
                              <FolloweesStatsPanel
                                album={this.state.album}
                              />
                            </>  
                        )}
                        <br/>
                        <div className="columns is-mobile has-margin-right-10">
                          <AlbumYoutubeLink
                            mbid={this.state.album.mbid}
                          />
                        </div>
                        <br/>
                        <AlbumsFromSameArtist
                          album={this.state.album}
                        />

                      </div>
                    </div>                                      
                  </div>
                </div>
            );
        }
        return (<div></div>);
    }
}

export default AlbumDetails;
