import React, { Component } from 'react';
import AlbumSidebar from 'components/AlbumDetails/Sidebar';
import { getReview } from 'services/Reviews';

export default class ReviewRetrieve extends Component {

    constructor(props){
        super(props);
        this.state = {
            review: null
        };
    }
    
    componentDidMount(){
        getReview(this.props.match.params.reviewId).then((response) => (
            this.setState({
                review: response.data
            }) 
        ));
    }
    
    render() {
        return this.state.review && (
            <div className="columns is-mobile">
              <div className="column is-12-mobile is-3-desktop">
                <AlbumSidebar
                  {...this.state.review.rating.content_object}
                />
              </div>
            </div>
        );
    }
}
