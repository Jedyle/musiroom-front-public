import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from 'services/Auth/api';
import { getReview, voteOnReview, updateReview } from 'services/Reviews';
import CommentSection from 'containers/Comments/Section';
import LikeDislikePanel from 'containers/LikeDislikePanel';
import { toHumanDate } from 'utils/date';
import { profileUrl } from 'pages/urls';
import { cleanHTML } from 'utils/strings';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import UserSummaryPanel from 'components/Utils/UserSummaryPanel';
import ReviewEditModal from 'components/Album/Review/EditModal';
import HeadLine from 'components/Utils/HeadLine';
import Title from 'components/Utils/Title';

import '../index.css';
import 'containers/StarRatings/Tags/index.css';

export default class RetrieveUpdateReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review: null,
            isEditable: false,
            isActive: false,
            editTitle: '',
            editContent: EditorState.createEmpty()            
        };
    }

    onClose = () => {
        this.setState({isActive: false});
    }

    onChangeTitle = (event) => {
        this.setState({
            editTitle: event.target.value 
        });
    }

    onChangeContent = (editorState) => {
        this.setState({
            editContent: editorState
        });
    }
    
    onSubmit = () => {
        updateReview(this.state.review.id,
                     this.state.editTitle,
                     draftToHtml(convertToRaw(this.state.editContent.getCurrentContent()))).then((response) => {
                         alert("Your review has been modified !");
                         this.setState({
                             review: response.data,
                             isActive: false
                         });
                     });
    }

    onToggleVote = (vote) => {
        let newVote;
        if (this.state.review.user_vote === vote){
            newVote = "null";
        }
        else {
            newVote = vote;
        }
        voteOnReview(this.state.review.id, newVote).then((response) => {
            this.setState({
                review: response.data
            });
        });
    }
    
    componentDidMount(){
        getReview(this.props.match.params.reviewId).then((response) => {
            let review = response.data;

            // make sure review concerns the right album
            if (review.rating.content_object.mbid !== this.props.album.mbid){
                this.props.history.push("/");
            }

            const contentBlock = htmlToDraft(review.content);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            
            this.setState({
                review: response.data,
                editTitle: review.title,
                editContent: editorState,
                isEditable: review.rating.user.username === getUser()
            });
        });
        
    }
    
    render() {
        let { album } = this.props;
        let { review } = this.state;
        return review && (
            <div className="column is-full-mobile is-two-thirds-widescreen">
              <Title title={`${review.title} - Review by m${review.rating.user.username} on ${album.title}`}/>
              <HeadLine
                title={review.title}
                heroClasses="is-light"
                subtitle={<><Link to={profileUrl(review.rating.user.username)}>{review.rating.user.username}</Link>, le {toHumanDate(review.date_publication)}</>}
              />
              <br/>
              {
                  this.state.isEditable &&
                      <div className="columns">
                        <div className="column">
                          <p className="is-pulled-right">
                            <button className="button" onClick={() => {this.setState({isActive: true});}}>Edit</button>
                          </p>
                        </div>
                      </div>
              }
              <div dangerouslySetInnerHTML={
                  {
                      __html: cleanHTML(review.content)
                  }
              }>
              </div>
              <br className="mt-6 mb-6"/>
              <LikeDislikePanel
                numVoteUp={review.num_vote_up}
                onToggleVoteUp={() => {this.onToggleVote("up");}}
                numVoteDown={review.num_vote_down}
                onToggleVoteDown={() => {this.onToggleVote("down");}}
                loggedUserVote={review.user_vote}
              />              
              <br className="mt-6 mb-6"/>              
              <UserSummaryPanel
                user={review.rating.user}
                additionalHeaders={
                    <span className="tag is-medium ml-3">{review.rating.score}</span>
                }
              />                
              <ReviewEditModal
                isActive={this.state.isActive}
                onClose={this.onClose}
                title={this.state.editTitle}
                onChangeTitle={this.onChangeTitle}
                content={this.state.editContent}
                onChangeContent={this.onChangeContent}
                onSubmit={this.onSubmit}
              />
              <hr/>
              <CommentSection
                contentType="review"
                objectId={this.state.review.id}
                hash={this.props.location.hash}
              />
            </div>
        );
    }
}

