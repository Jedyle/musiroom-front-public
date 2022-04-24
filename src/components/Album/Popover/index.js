import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom';
import Popover from 'react-popover';
import RateAlbum from 'components/Album/Actions/RateAlbum';
import InterestButton from 'components/Album/Actions/AddToInterests';
import AddToListButton from 'components/Album/Actions/AddToList';
import { getAlbumUrl } from 'pages/urls';
import { GetArtistLink } from 'containers/Links';
import { truncate } from 'utils/strings';
import { getUser } from 'services/Auth/api';
import { getAlbum } from 'services/Albums';
import { getOwnRating, changeOwnRating, createOwnRating, deleteOwnRating } from 'services/OwnRatings';

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
        });
    }

    onChangeRating = (score) => {
        const changeRating = this.props.changeRating;
        const call = this.state.album.user_rating ? changeOwnRating : createOwnRating;
        call(this.state.album.rating.id, score).then((response) => {
            changeRating(score);
            this.setState(prevState => {
                let album = Object.assign({}, prevState.album);
                album.user_rating = score;
                return {
                    album: album
                }
            })
        });
    }

    onDeleteRating(score){
        deleteOwnRating(this.props.album.rating.id).then((response) => {
            this.props.changeRating(0);
        })
    }
    
    render(){
        let { mbid, changeRating, deleteRating, ...props } = this.props;
        let { album } = this.state;
        return (
            <div className="box" style={{width: '400px', padding: '0.6rem', boxShadow: 'none'}} {...props}>
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
                              userRating={album.user_rating || 0}
                              changeRating={this.onChangeRating}
                              deleteRating={this.onDeleteRating}
                              starDimension='20px'
                              starSpacing='0px'                              
                            />
                          </div>
                          <div>
                          <InterestButton
                            mbid={mbid}
                            contentWhenInterest={
                                <span className="icon">
                                  <i className="fa fa-headphones"></i>
                                </span>
                            }
                            contentWhenNoInterest={
                                <span className="icon">
                                  <i className="fa fa-headphones"></i>
                                </span>
                            }
                          />
                          <AddToListButton
                            mbid={mbid}
                          >
                            <span className="icon"><i className="fa fa-list"></i></span>
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

const AlbumPopover = ({mbid, changeRating, deleteRating, children}) => {

    const [open, setOpen] = useState(false);

    return (
        getUser() ?
            <Popover
              body={<PopoverContent
                      mbid={mbid}
                      changeRating={changeRating}
                      deleteRating={deleteRating}
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
