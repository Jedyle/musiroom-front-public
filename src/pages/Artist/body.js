import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from 'components/Utils/Forms/Input';
import { getSimilarArtists, getArtistDiscography } from 'services/Artists';
import SimilarArtistsPanel from 'components/Artist/SimilarArtistsPanel';
import RatingTags from 'containers/StarRatings/Tags';
import { getAlbumUrl } from 'pages/urls';

import './index.css';

const DiscographyTable = ({
    albums,
    onChangeRatingForAlbum,
    afterLoadPopoverForAlbum
}) => (
    <table className="table is-fullwidth">
      <tbody>
      <tr>
        <th>Year</th>
        <th>Title</th>
        <th>
          <span className="is-pulled-right">Ratings</span>
        </th>
      </tr>
        {
            albums.map(
                (album, index) => (
                    <tr>
                      <th className="year">{album.year}</th>
                      <th className="album">
                        <Link to={getAlbumUrl(album.mbid)}>
                          {album.title}
                        </Link>
                      </th>
                      <th className="ratings">
                        <RatingTags
                          mbid={album.mbid}
                          ratingId={album.details && album.details.rating.id}
                          userRating={album.details && album.details.user_rating}
                          followeesRating={album.details && album.details.followees_avg}
                          avgRating={album.details && album.details.rating.average}
                          onChangeRating={(response) => onChangeRatingForAlbum(index, response)}
                          afterLoadPopover={afterLoadPopoverForAlbum && ((albumData) => afterLoadPopoverForAlbum(index, albumData))}
                        />
                      </th>
                    </tr>
                ))
            }
      </tbody>
    </table>
);


export default class ArtistBody extends Component {

    constructor(props){
        super(props);
        this.state = {
            similarArtists: null,
            discography: null,
            search: ''
        };
        this.onPressEnter = this.onPressEnter.bind(this);
    }

    componentDidMount(){
        this.fetchSimilarArtists();
        this.fetchDiscography();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.search !== this.state.search){
            this.fetchDiscography();
        }
    }

    fetchSimilarArtists(){
        getSimilarArtists(this.props.artist.mbid).then((response) => {
            this.setState({
                similarArtists: response.data.similar
            });
        });
    }

    fetchDiscography(){
        getArtistDiscography(this.props.artist.mbid, this.state.search).then((response) => {
            this.setState({
                discography: response.data.results
            });
        });
    }

    onPressEnter(e){
        this.setState({
            search: e.target.value
        });
    }

    onChangeRating = (releaseIndex, albumIndex, response) => {
        this.setState((prevState) => {
            let discography = prevState.discography.slice();
            discography[releaseIndex]["items"][albumIndex]["details"]["user_rating"] = response.data;
            return {
                discography: discography
            }
        })
    }

    updateAlbum = (releaseIndex, albumIndex, response) => {
        this.setState((prevState) => {
            let discography = prevState.discography.slice();
            discography[releaseIndex]["items"][albumIndex]["details"] = response.data;
            return {
                discography: discography
            }
        })
    }

    render() {
        return (
            <div className="columns is-multiline">
              <div className="column is-12">
                <h1 className="title is-size-1 has-text-centered">{this.props.artist.name}</h1>
                {this.state.similarArtists &&
                    <SimilarArtistsPanel
                      artists={this.state.similarArtists.items}
                    />
                }
                <br/>
                <div className="">
                  <Input
                    placeholder="Filter by exact name"
                    name="search"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13){
                            this.onPressEnter(e);
                        }
                    }}
                  />
                </div>
                <br/>
                <br/>
            {this.state.discography &&
             this.state.discography.map(
                 (releaseType, index) => (
                     <>
                       <h1 className="title is-size-3">{releaseType.release_type}</h1>
                       <DiscographyTable
                         albums={releaseType.items}
                         onChangeRatingForAlbum={(albumIndex, response) => this.onChangeRating(index, albumIndex, response)}
                         afterLoadPopoverForAlbum={(albumIndex, response) => this.updateAlbum(index, albumIndex, response)}
                       />
                     </>
                 )
             )
            }
              </div>
            </div>
        );
    }
}
