import React, { Component } from 'react';
import ShortAlbumList from 'components/AlbumList/ShortAlbumList';
import { getUser } from 'services/Auth/api';
import { getTopAlbums, getBadges } from 'services/Profile';
import { getAlbumUrl, createListUrl } from 'pages/urls';
import { Link } from 'react-router-dom';
import BadgesList from 'components/Profile/Badges';

class ProfileTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topAlbums: [],
            badges: []
        };
    }

    updateTopAlbums(){
        if (this.props.profile)
        {
            getTopAlbums(this.props.profile.user).then(
                (response) => {
                    console.log(response);
                    this.setState(
                        {
                            topAlbums: response.data.items.map((item) => item.album)
                        }
                    );
                }
            );
        }
    }

    updateBadges(){
        if (this.props.profile){
            getBadges(this.props.profile.user).then(
                (response) => {
                    this.setState({
                        badges: response.data.results
                    });
                }
            );
        }
    }

    componentDidMount(){
        this.updateTopAlbums();
        this.updateBadges();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.profile !== prevProps.profile){
            this.updateTopAlbums();
            this.updateBadges();
        }
    }
    
    getDescription(){
        return this.props.profile ? this.props.profile.description : "";
    }

    getStatistics(){
        if (this.props.profile){
        return (
            <ul style={{listStyleType: 'circle'}}>
              <li>{this.props.profile.nb_ratings} albums notés</li>
              <li>{this.props.profile.nb_reviews} critiques</li>
            </ul>            
        );}
        return "";
    }

    getTopAlbums(){
        console.log("tops", this.state.topAlbums);
        return this.state.topAlbums.map((album) => {
            return {
                title: album.title,
                media_cover: album.media_cover,
                content: (<span>
                            <Link to={getAlbumUrl(album.mbid)}><strong>{album.title}</strong></Link> de <Link>{album.artists[0].name}</Link>
                          </span>)
            };
        });
    }

    getBadges(){
        return this.state.badges.map((badge) => {
            return {
                name: badge.name,
                image: process.env.REACT_APP_API_URL + badge.image,
                description: badge.description
            };
        });
    }

    render(){
        return (
            <div>
              <hr/>
              <h3 className="title is-4 has-text-centered">Profil {this.props.profile ? "de " + this.props.profile.user : ''}</h3>
              <hr/>
              <article className="message">
                <div className="message-body has-text-centered">
                  {this.getDescription()}
                </div>
              </article>
              <div className="columns">
                
                <div className="column is-6">
                  
                  <div className="columns is-multiline">
                    <div className="column is-12 has-margin-left-10">
                      {this.getStatistics()}
                    </div>
                    <div className="column is-12">
                      {
                          getUser() &&
                              <Link className="button is-fullwidth is-success" to={createListUrl()}>Nouvelle liste</Link>
                      }
                    </div>
                  </div>
                  
                  <h3 className="title is-5">Ses albums préférés</h3>
                  <ShortAlbumList
                    albums={this.getTopAlbums()}
                  />
                  
                  <a className="has-text-right">
                    Voir son top
                  </a>
                  
                </div>

                <div className="column is-6">
                  <BadgesList
                    badges={this.getBadges()}
                  />
                </div>

              </div>
              <div className="columns">
              </div>
            </div>
        );
    }
}

export default ProfileTab;
