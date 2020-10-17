import React, { Component } from 'react';
import { getAlbumYoutubeLink } from 'services/Albums';
import Base from './base';

export class AlbumYoutubeLink extends Component {

    constructor(props){
        super(props);
        this.state = {
            link: null  
        };
    }
    
    componentDidMount(){
        getAlbumYoutubeLink(this.props.mbid).then(
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

export default AlbumYoutubeLink;
