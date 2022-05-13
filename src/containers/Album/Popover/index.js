import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom';
import Popover from 'react-popover';
import RateAlbum from 'containers/Album/Actions/RateAlbum';
import AddToInterests from 'containers/Album/Actions/AddToInterests';
import AddToCollection from 'containers/Album/Actions/AddToCollection';
import AddToListButton from 'containers/Album/Actions/AddToList';
import { getAlbumUrl } from 'pages/urls';
import { GetArtistLink } from 'containers/Links';
import { truncate } from 'utils/strings';
import { getUser } from 'services/Auth/api';
import { getAlbum } from 'services/Albums';
import { changeRating, deleteRating, changeInterest, changeCollection } from 'services/OwnRatings';

// this css makes sure we can use a modal inside the popover (dirty fix)
import './index.css';


class PopoverContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            album: null
        };
    }

    componentDidMount(){
        getAlbum(this.props.mbid).then((res) => {
            this.setState({
                album: res.data
            });
            this.props.afterLoad && this.props.afterLoad(res);
        });
    }
    
    render(){
        let { mbid, ratingId, userRating, onChangeRating } = this.props;
        let { album } = this.state;
        return (
            <div className="box" style={{width: '400px', padding: '0.6rem', boxShadow: 'none'}}>
              { album ?
                (
                    <article className="media">
                      <div className="media-left">
                        <figure className="image is-96x96">
                          <img src={album.media_cover} alt={album.title}/>
                        </figure>
                      </div>
                      <div className="media-content">
                        <div className="content">
                          <h1 className="is-size-6 is-marginless"
                              style={{maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis'}}                            
                          >
                            <Link to={getAlbumUrl(album.mbid)}>{truncate(album.title, 25)}</Link>
                            <span className="tag is-avg-rating is-pulled-right">
                              {
                                  album.rating.average !== 0 ? album.rating.average.toFixed(1) : '-'}
                            </span>
                          </h1>
                          <p className="is-marginless">
                            {album.artists.map((artist) => (
                                <GetArtistLink mbid={artist.mbid} name={artist.name}/>
                            )).reduce((prev, curr) => [prev, ', ', curr])}
                            <br/>
                          </p>
                          <div>
                            <RateAlbum
                              userRating={userRating && userRating.score ? userRating.score : 0}
                              changeRating={(score) => {
                                  if (!userRating || score !== userRating.score){
                                      changeRating(ratingId, userRating, score, (response) => onChangeRating(response));   
                                  }
                              }}
                              deleteRating={(score) => {
                                  deleteRating(ratingId, userRating, (response) => onChangeRating(response));
                              }}
                              starDimension='20px'
                              starSpacing='0px'                              
                            />
                          </div>
                          <div>
                          <AddToInterests
                            onChangeInterest={() => changeInterest(ratingId, userRating, (response) => onChangeRating(response))}
                            interest={userRating ? userRating.is_interested : false}  
                            contentWhenInterest={
                                <span title="I want to listen" className="icon">
                                  <i className="fa fa-map-marker"></i>
                                </span>
                            }
                            contentWhenNoInterest={
                                <span title="Add to interests" className="icon">
                                  <i className="fa fa-map-marker"></i>
                                </span>
                            }
                          />
                          <AddToCollection
                            onChangeCollection={() => changeCollection(ratingId, userRating, (response) => onChangeRating(response))}
                            inCollection={userRating ? userRating.is_in_collection : false}  
                            contentInCollection={
                                <span title="In my collection" className="icon">
                                  <i className="fa fa-headphones"></i>
                                </span>
                            }
                            contentNotInCollection={
                                <span title="Add to collection" className="icon">
                                  <i className="fa fa-headphones"></i>
                                </span>
                            }
                          />                            
                          <AddToListButton
                            mbid={mbid}
                          >
                            <span title="Add to list" className="icon"><i className="fa fa-list"></i></span>
                          </AddToListButton>                           
                          </div>
                        </div>
                      </div>
                    </article>
                ) : (
                    <div>Loading...</div>
                )

              }
            </div>
        );
    }
    
}

const AlbumPopover = ({mbid, onChangeRating, ratingId, userRating, children, afterLoad}) => {

    const [open, setOpen] = useState(false);

    return (
        getUser() ?
            <Popover
              body={<PopoverContent
                      mbid={mbid}
                      onChangeRating={onChangeRating}
                      ratingId={ratingId}
                      userRating={userRating}
                      afterLoad={afterLoad}
                    />}
              isOpen={open}
              onOuterAction={(e) => setOpen(false)}
            >
              <span onMouseOver={() => setOpen(true)}>
                {children}
              </span>
            </Popover>
        : children  
    );
}

export default AlbumPopover;
