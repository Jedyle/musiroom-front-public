import React, { Component } from 'react';
import CommentTreeView from 'components/Comments/Tree';
import CommentForm from 'components/Comments/CreateForm';
import { getUser } from 'services/Auth/api';
import { getCommentsForObject, createComment, updateComment, voteOnComment } from 'services/Comments';
import InfiniteScroll from "react-infinite-scroller";


const SortCommentsSelect = ({sortMethod, sortChoices, onChange}) => (
    <div className="select" onChange={onChange} value={sortChoices[sortMethod]}>
      <select>
        {
            Object.keys(sortChoices).map((choice) => (
                <option value={choice}>{sortChoices[choice]}</option>
            ))
        }
      </select>
    </div>
);

export default class CommentSection extends Component {

    constructor(props){
        super(props);
        this.state = {
            comments: [],
            // map of comments with {id : {data: comment_data, children: [list of ids]}}
            commentMap: {},
            // list of ids of the comments that have no parent
            rootComments: [],
            hasMore: true,
            perPage: 10,
            sortChoices: {
                '-vote_score': 'Top',
                '-submit_date': 'New'                
            },
            sortMethod: '-vote_score'
        };
        this.onSubmitComment = this.onSubmitComment.bind(this);
        this.onCommentVote = this.onCommentVote.bind(this);
        this.onEditComment = this.onEditComment.bind(this);
        this.fetchComments = this.fetchComments.bind(this);
        this.onChangeSortMethod = this.onChangeSortMethod.bind(this);
    }    
    
    generateCommentMap(comments){
        let commentStack = comments.slice();
        let commentMap = {};
        let rootComments = commentStack.map((rootComment) => (rootComment.id));
        while (commentStack.length > 0){
            // deep copy since we delete the attribute 'children'
            let comment = Object.assign({}, commentStack.shift());
            let children = comment.children;
            delete comment.children;
            commentMap[comment.id] = {
                data: comment,
                children: children.map((child) => (child.id)),
                isEditable: (comment.user.username === getUser())
            };
            children.forEach((child) => {
                commentStack.push(child);
            });
        }
        return {
            commentMap: commentMap,
            rootComments: rootComments
        };
    }

    fetchComments(page){
        return getCommentsForObject(
            {
                contentType: this.props.contentType,
                objectId: this.props.objectId,
                page: page,
                limit: this.state.perPage,
                ordering: this.state.sortMethod
            }).then((response) => {            
                this.setState((prevState) => {
                    let comments = prevState.comments.concat(response.data.results);
                    let hasMore = response.data.next !== null; 
                    let { commentMap, rootComments} = this.generateCommentMap(comments);
                    return {
                        comments: comments,
                        hasMore: hasMore,
                        commentMap: commentMap,
                        rootComments: rootComments
                    };
                });
            });        
    }

    updateSingleComment(commentId, commentWithChildren){
        let commentMap = this.state.commentMap;
        delete commentWithChildren.children;
        commentMap[commentId].data = commentWithChildren;
        this.setState({
            commentMap: commentMap
        });
    }

    addCommentAsFirstChildren(parentId, comment){
        // when a user submits a comment, place it on the top if it has no parent
        // or on top of the parent's children if there is one
        let commentMap = this.state.commentMap;
        let rootComments = this.state.rootComments;
        delete comment.children;
        commentMap[comment.id] = {
            data: comment,
            children: [],
            isEditable: (comment.user.username === getUser())
        };
        if (parentId){
            commentMap[parentId].children.unshift(comment.id);
        }
        else {
            rootComments.unshift(comment.id);
        }
        this.setState({
            commentMap: commentMap,
            rootComments: rootComments
        });
    }

    onSubmitComment(parentId, content, event){
        event.preventDefault();
        createComment({
            content: content,
            parentId: parentId,
            contentType: this.props.contentType,
            objectId: this.props.objectId
        }).then((response) => {
            // TODO : replace this by fetching only comments needed ! i.e children
            this.addCommentAsFirstChildren(parentId, response.data);
        });
    }

    onEditComment(commentId, content, event){
        event.preventDefault();
        updateComment(commentId, content).then((response) => {
            this.updateSingleComment(commentId, response.data);
        });
    }
        
    onCommentVote(commentId, action){
        voteOnComment(commentId, action).then((response) => {
            this.updateSingleComment(commentId, response.data);
        });
    }

    onChangeSortMethod(event){
        this.setState({
            comments: [],
            rootComments: [],
            hasMore: true,
            sortMethod: event.target.value
        });
    }
        
    
    render() {
        return (
            <>
              {getUser () &&
               <CommentForm
                 content={this.state.newCommentContent}
                 onChangeContent={(e) => {this.setState({newCommentContent: e.target.value});}}
                 onSubmitComment={(e) => {this.onSubmitComment(null, this.state.newCommentContent, e); this.setState({newCommentContent: ''});}}
               />
              }
              <br/>
              <SortCommentsSelect
                sortMethod={this.state.sortMethod}
                sortChoices={this.state.sortChoices}
                onChange={this.onChangeSortMethod}
              />
              <InfiniteScroll
                key={this.state.sortMethod}
                pageStart={0}
                loadMore={this.fetchComments}
                hasMore={this.state.hasMore}
                loader={<h4>Chargement...</h4>}
              >

                <CommentTreeView
                  {...this.props}
                  rootComments={this.state.rootComments}
                  commentMap={this.state.commentMap}
                  onSubmitComment={this.onSubmitComment}
                  onCommentVote={this.onCommentVote}
                  onEditComment={this.onEditComment}
                  depthLevel={0}
                  maxDepth={2}
                />                
              </InfiniteScroll>
            </>
        );
    }
}
