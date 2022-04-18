import React, { Component } from 'react';
import Input from 'components/Utils/Forms/Input';
import { getSimilarArtists, getArtistDiscography } from 'services/Artists';
import SimilarArtistsPanel from 'components/Artist/SimilarArtistsPanel';
import DiscographyTable from 'components/Artist/DiscographyTable';

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
                 (releaseType) => (
                     <>
                       <h1 className="title is-size-3">{releaseType.release_type}</h1>
                       <DiscographyTable albums={releaseType.items}/>
                     </>
                 )
             )
            }
              </div>
            </div>
        );
    }
}
