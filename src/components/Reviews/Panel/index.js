import React, { Component } from 'react';
import { removeHTML } from 'utils/strings';
import { profileUrl, getReviewUrl } from 'pages/urls';
import { Link } from 'react-router-dom';
import { getReviewsForRatedObject } from 'services/Reviews';
import Paginator from 'components/Utils/Paginator';
import Input from 'components/Utils/Forms/Input';

const ReviewList = ({
    reviews
}) => (
    <div className="columns has-background-light">
      <div className="column">
        {reviews.map(
            (review) => (
                <div className="has-padding-5" key={review.id}>
                  <h1 className="title is-size-4">{review.title}</h1>
                  <p>
                    {review.content.substr(0, 400)}...
                  </p>
                  <p className="has-text-right">
                    <Link to={getReviewUrl(review.rating.content_object.mbid, review.id)}>Lire la critique</Link>
                    {"    "}
                    <span className="icon has-margin-left-20">
                      <i className="fa fa-heart has-margin-right-5"></i>
                      {review.num_vote_up}
                    </span>
                  </p>
                  <p>
                    <span className="tag is-medium is-profile-rating has-margin-right-10">
                      {review.rating.score}
                    </span>
                    <Link to={profileUrl(review.rating.user.username)}>
                      {review.rating.user.username}
                    </Link>                    
                  </p>
                  <hr style={{backgroundColor: 'rgb(240, 240, 240)'}}/>
                </div>
            ) 
        )}
      </div>
    </div>
);


class ReviewsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            previousPage: null,
            nextPage: null,
            title: '',
            ordering: '-date_publication',
            reviews: []
        };
        this.setParam = this.setParam.bind(this);
    }

    componentDidMount(){
        this.fetchReviews();
    }
    
    componentDidUpdate(prevProps, prevState){
        if (this.state.currentPage !== prevState.currentPage || this.state.ordering !== prevState.ordering || this.state.title !== prevState.title){
            this.fetchReviews();
        }
    }
    
    setParam(element, e){
        this.setState({
            [element]: e.target.value,
            currentPage: 1
        });
    }
    
    fetchReviews(){
        if(this.props.album.rating){            
            getReviewsForRatedObject({
                rating_id: this.props.album.rating.id,
                page: this.state.currentPage,
                ordering: this.state.ordering,
                title: this.state.title
            }).then(
                (response) => {
                    let reviews = response.data.results.map((rev) => {
                        // we remove all html tags from the review
                        let review = Object.assign({}, rev);
                        review.content = removeHTML(review.content);
                        return review;
                    });
                    this.setState({
                        reviews: reviews,
                        previousPage: response.data.previous,
                        nextPage: response.data.next
                    });
                }
            );
        }
    }


    render(){
        return (
            <div>
              <h4 className="title is-size-4">Critiques</h4>
              <div className="field is-horizontal">
                <div className="field-body">
                  <Input
                    placeholder="Titre"
                    value={this.state.title}
                    onChange={(e) => {this.setState({title: e.target.value});}}
                  />
                  <div className="field">
                    <div className="select has-padding-left-10">
                      <select value={this.state.ordering}
                              onChange={(e) => {this.setParam('ordering', e);}}>
                        <option value="-date_publication">Les plus récentes</option>
                        <option value="-rating__score">Meilleures notes</option>
                        <option value="rating__score">Moins bonnes notes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <Paginator
                currentPage={this.state.currentPage}
                previousPageUrl={this.state.previousPage}
                nextPageUrl={this.state.nextPage}
                onPreviousPage={() => {this.setState({
                    currentPage: this.state.currentPage-1
                });}}
                onNextPage={() => {this.setState({
                    currentPage: this.state.currentPage+1
                });}}
              />              
              <br/>
              <br/>
              <ReviewList
                reviews={this.state.reviews}
              />
            </div>
        );
    }    
}

export default ReviewsPanel;
