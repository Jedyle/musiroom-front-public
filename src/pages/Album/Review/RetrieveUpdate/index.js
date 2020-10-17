import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { getUser } from 'services/Auth/api';
import { getReview, voteOnReview, updateReview } from 'services/Reviews';
import CommentSection from 'components/Comments/Section';
import LikeDislikePanel from 'components/Utils/LikeDislikePanel';
import Input from 'components/Utils/Forms/Input';
import { toHumanDate } from 'utils/date';
import { profileUrl } from 'pages/urls';
import { cleanHTML } from 'utils/strings';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import UserSummaryPanel from 'components/Utils/UserSummaryPanel';

import '../index.css';
import 'components/StarRatings/Tags/index.css';

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
        this.onClose = this.onClose.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onToggleVote = this.onToggleVote.bind(this);
    }

    onClose(){
        this.setState({isActive: false});
    }

    onChangeTitle(event){
        this.setState({
            editTitle: event.target.value 
        });
    }

    onChangeContent(editorState){
        this.setState({
            editContent: editorState
        });
    }
    
    onSubmit(){
        updateReview(this.state.review.id,
                     this.state.editTitle,
                     draftToHtml(convertToRaw(this.state.editContent.getCurrentContent()))).then((response) => {
                         alert("Votre critique a bien été modifiée !");
                         this.setState({
                             review: response.data,
                             isActive: false
                         });
                     });
    }

    onToggleVote(vote){
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
        let review = this.state.review;
        return review && (
            <div className="column is-full-mobile is-two-thirds-widescreen">
              <section className="hero is-light">
                <div className="hero-body">
                  <div className="container">                    
                    <h1 className="title has-text-centered">
                      {review.title}
                    </h1>
                    <h2 className="subtitle has-text-centered is-size-6">
                      <Link to={profileUrl(review.rating.user.username)}>{review.rating.user.username}</Link>, le {toHumanDate(review.date_publication)}
                    </h2>
                  </div>
                </div>
              </section>
              <br/>
              {
                  this.state.isEditable &&
                      <div className="columns">
                        <div className="column">
                          <p className="is-pulled-right">
                            <button className="button" onClick={() => {this.setState({isActive: true});}}>Modifier</button>
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

class ReviewEditModal extends Component {
    render(){
        let { isActive, onClose, title, onChangeTitle, content, onChangeContent, onSubmit } = this.props;
        return (
            <div className={`modal ${isActive && 'is-active'}`}>
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Modifier la critique</p>
                  <button className="delete" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                  <Input
                    placeholder="Titre"
                    value={title}
                    onChange={onChangeTitle}
                  />
                  <Editor
                    wrapperClassName="wrapper"
                    editorClassName="editor"
                    editorState={content}
                    onEditorStateChange={onChangeContent}
                    toolbar={{
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough'],
                        },
                        list: {
                            options: ['unordered', 'ordered'],
                        },
                        blockType: {
                            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']
                        },
                        options: ['blockType', 'inline', 'list', 'fontSize', 'colorPicker', 'emoji', 'image'],

                    }}                                    
                  />
                  
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" onClick={onSubmit}>Enregistrer</button>
                  <button className="button" onClick={onClose}>Annuler</button>
                </footer>
              </div>
            </div>  
        );
    }
}
