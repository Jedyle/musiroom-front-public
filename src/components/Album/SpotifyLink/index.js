import React, { Component } from 'react';
import { getAlbumSpotifyLink } from 'services/Albums';
import Base from './base';

export class AlbumSpotifyLink extends Component {

    constructor(props){
        super(props);
        this.state = {
            link: null  
        };
    }
    
    componentDidMount(){
        getAlbumSpotifyLink(this.props.mbid).then(
            (response) => {
            this.setState({
                link: response.data.link
            });
            }
        );
    }
    
    render() {
        return (
            <Base
              link={this.state.link}
            />
        );
    }
}

export default AlbumSpotifyLink;
