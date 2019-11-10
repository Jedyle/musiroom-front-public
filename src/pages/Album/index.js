import React, { Component } from 'react';
import { getAlbum } from 'services/Albums';
import AlbumSidebar from 'components/AlbumDetails/Sidebar';
import TrackList from 'components/AlbumDetails/TrackList';
import StarRatingsChild from 'components/StarRatings';
import 'components/AlbumList/AlbumItem/index.css';
import ReviewsPanel from './reviews';
import AlbumStats from './albumStats';

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
            album: null,
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
                      <button className="button is-medium has-margin-top-5 is-fullwidth is-info">Discussions sur {this.state.album.title}</button>
                      <button className="button is-medium has-margin-top-5 is-fullwidth is-success">Nouvelle discussion</button>
                    </span>
                    <hr/>
                    <h3 className="is-size-5">Pistes</h3>
                    <TrackList
                      tracks={this.state.album.mbid ? this.state.album.tracks.track_list : []}
                    />                
                  </div>
                  <div className="column is-12-mobile is-9-desktop has-padding-left-30">
                    <div className="columns is-multiline">
                      <div className="column is-12-mobile is-5-desktop">
                        <h1 className="title is-size-2">{this.state.album.title}</h1>
                        <StarRatingsChild
                          rating={5}
                          starDimension="30px"
                          starSpacing="4px"
                        />
                        <br/>
                        <br/>
                        <button className="button has-margin-right-5">Ajouter à une liste</button>
                        <button className="button">Ajouter à mes envies</button>
                      </div>
                      <div className="column is-8-mobile is-offset-1-desktop is-3-desktop has-margin-top-20">
                        <AlbumStats
                          album={this.state.album}
                        />
                      </div>
                      <div className="column is-9">
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
                    </div>                                      
                  </div>
                </div>
            );
        }
        return (<div></div>);
    }
}

export default AlbumDetails;
