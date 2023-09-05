import React, { Component } from 'react';
import ShortAlbumList from 'components/AlbumList/ShortAlbumList';
import { getAlbumsFromSameArtist } from 'services/Albums';
import { Link } from 'react-router-dom';
import { getAlbumUrl } from 'pages/urls';

export class AlbumsFromSameArtist extends Component {

    constructor(props){
        super(props);
        this.state = {
            similarAlbums: []
        };
    }

    componentDidMount(){
        getAlbumsFromSameArtist(this.props.album.mbid).then(
            (response) => {
                this.setState({
                    similarAlbums: response.data.results.map((
                        album => {
                            return {
                                content: (<span>
                                            <Link to={getAlbumUrl(album.mbid)}>
                                              <strong>{album.title}</strong>
                                            </Link>
                                          </span>),
                                ...album
                            };
                        }
                    ))
                });
            }
        );
    }

    render() {
        return (
            <>
              <p className="title is-size-5 has-text-centered">By the same artist</p>
              <ShortAlbumList
                albums={this.state.similarAlbums}
              />
            </>
        );
    }
}

export default AlbumsFromSameArtist;
