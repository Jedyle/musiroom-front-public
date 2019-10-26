import React, { Component } from 'react';
import { getReviews } from 'services/Profile';
import AlbumList from 'containers/AlbumList';
import AbstractListTab from '../AbstractListTab';
import { Link } from 'react-router-dom';

const ReviewFormatter = ({
    title,
    content,
    reviewLink
}) => 
      {
          let maxTitleLength = 50;
          let maxContentLength = 300;
          return (
              <div>
                <h1 className="title is-size-5 is-size-6-mobile">
                  {title.length > maxTitleLength ? title.slice(0, maxTitleLength) + "..." : title}
                  <span className="is-hidden-tablet">
                    {"   "} (<Link to={reviewLink}>voir la critique</Link>)
                  </span>
                </h1>
                <p className="is-hidden-mobile">
                  {content.length > maxContentLength ? content.slice(0, maxContentLength) + "..." : content}
                  {"   "}
                  (<Link to={reviewLink}>voir la critique</Link>)
                </p>
              </div>
          );
      };
;

class ReviewsList extends Component {

    formatContent(){
        let formattedReviews = {};
        for (let review of this.props.results){
            formattedReviews[review.rating.id] = (           
                <ReviewFormatter
                  title={review.title}
                  content={review.content}
                />
            );
        }
        return formattedReviews;
    }
    
    render(){
        return (
            <AlbumList
              ratedObjects={this.props.results.map(
                  (review) => review.rating.content_object
              )}
              content={this.formatContent()}
            />
        );
    }
}

const ReviewsTab = (props) => (
    <AbstractListTab
      header={
          (<span>
             <hr/>
             <h4 className="title is-4 has-text-centered">Critiques</h4>
             <hr/>
           </span>)
      }
      ListComponent={ReviewsList}
      fetchElements={getReviews}
      {...props}
    />  
);

export default ReviewsTab;
