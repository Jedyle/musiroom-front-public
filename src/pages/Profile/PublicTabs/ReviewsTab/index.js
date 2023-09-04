import React, { Component } from 'react';
import { getReviews } from 'services/Profile';
import AlbumList from 'containers/AlbumList';
import AbstractListTab from '../AbstractListTab';
import { Link } from 'react-router-dom';
import { getReviewUrl } from 'pages/urls';
import { removeHTML } from 'utils/strings';

const ReviewFormatter = ({
    title,
    content,
    reviewLink,
    score
}) =>
      {
          let maxTitleLength = 50;
          let maxContentLength = 300;
          return (
              <div>
                <h1 className="title is-size-5 is-size-6-mobile">
                  {title.length > maxTitleLength ? title.slice(0, maxTitleLength) + "..." : title}
                  <span className="is-hidden-tablet">
                    {"   "} (<Link to={reviewLink}>read review</Link>)
                  </span>
                </h1>
                <p className="is-hidden-mobile">
                  {content.length > maxContentLength ? content.slice(0, maxContentLength) + "..." : content}
                  <br/>
                  <bold>
                    <Link to={reviewLink}>Read review</Link>
                  </bold> (rated {score})
                </p>
              </div>
          );
      };
;

class ReviewsList extends Component {

    formatContent(){
        let formattedReviews = {};
        for (let review of this.props.results){
            // review.rating is the UserRating. review.rating.rating gives the rating object
            formattedReviews[review.rating.rating] = (
                <ReviewFormatter
                  title={review.title}
                  content={removeHTML(review.content)}
                  reviewLink={getReviewUrl(review.rating.content_object.mbid, review.id)}
                  score={review.rating.score}
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
             <h4 className="title is-4 has-text-centered">Reviews</h4>
             <hr/>
           </span>)
      }
      ListComponent={ReviewsList}
      fetchElements={getReviews}
      orderingFields={[
          ['-date_publication', 'Recent'],
          ['-vote_score', 'Popular'],
          ['-rating__score', 'Best ratings'],
          ['rating__score', 'Worst ratings']
      ]}
      {...props}
    />
);

export default ReviewsTab;
