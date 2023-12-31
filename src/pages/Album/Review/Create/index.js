import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Input from 'components/Utils/Forms/Input';

import { getUserRating } from 'services/OwnRatings';
import { createReview } from 'services/Reviews';
import { getReviewUrl } from 'pages/urls';
import Title from 'components/Utils/Title';

import '../index.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class CreateReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ownRating: {},
            title: '',
            editorState: EditorState.createEmpty(),
            errors: {
                nonField: [],
                title: [],
                content: []
            }
        };
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.onSubmitReview = this.onSubmitReview.bind(this);
    }

    componentDidMount(){
        getUserRating(this.props.album.rating.id).then((res) => {
            if (res.data.review){
                // review already exists, quit
                // TODO: go to existing review instead !
                this.props.history.push("/");
            }
            this.setState({
                ownRating: res.data
            });
        }).catch((error) => {
            if (error.response.status === 404){
                this.props.history.push("/");
            }
        });
    }

    onEditorStateChange(editorState){
        this.setState({
            editorState: editorState,
        });
    };

    onSubmitReview(){
        const { title, editorState, ownRating } = this.state;
        createReview({
            rating: ownRating.id,
            title: title,
            content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }).then((response) => {
            alert("Your review has been created !");
            this.props.history.push(getReviewUrl(this.props.album.mbid, response.data.id));
        }).catch((error) => {
            if (error.response.status === 400){
                this.setState({
                    errors: {
                        nonField: error.response.data.non_field_errors,
                        title: error.response.data.title,
                        content: error.response.data.content,
                    }
                });
            }
        });
    }

    render() {
        const { title, editorState } = this.state;
        return (
            <div className="column is-full-mobile is-two-thirds-widescreen">
              <Title title={`New review for ${this.props.album.title}`}/>
              <h1 className="title has-text-centered">New review for {this.props.album.title}</h1>
              <h2 className="is-size-6 has-text-centered">Your rating : {this.state.ownRating.score}</h2>
              <p className="help-is-danger">{this.state.errors.nonField}</p>
              <br/>
              <Input
                placeholder="Title"
                name="title"
                value={title}
                onChange={(e) => this.setState({title: e.target.value})}
                errorMessages={this.state.errors.title}
              />
              <br/>
              <p className="help-is-danger">{this.state.errors.content}</p>
              <Editor
                wrapperClassName="wrapper"
                editorClassName="editor"
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
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
              <button className="button is-fullwidth is-info is-outlined"
                      onClick={this.onSubmitReview}
              >Validate</button>
            </div>
        );
    }
}

export default withRouter(CreateReview);
