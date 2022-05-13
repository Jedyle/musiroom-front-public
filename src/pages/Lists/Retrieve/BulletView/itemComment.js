import React, { Component } from 'react';

import './style.css';

class ItemComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditable: false,
            newComment: props.comment,
            errors: {}
        };
    }

    onChange = (e) => {this.setState({
        newComment: e.target.value
    });}

    onCancel = () => {this.setState({
        newComment: this.props.comment,
        isEditable: false
    });};

    onEdit = () => {this.setState({
        isEditable: true
    });}

    onSubmit = () => {
        this.props.onSubmit(this.state.newComment).then(() => {
            this.setState({
                isEditable: false,
                errors: {}
            });
        }).catch(error => {
            if (error.response.status === 400){
                this.setState({
                    errors: error.response.data
                })
            }
        });
    }

    render(){
        let { comment, userCanEdit } = this.props;
        let { isEditable, newComment, errors } = this.state;
        return !isEditable ? (
            <div>
              {userCanEdit &&
               (
                   <span className="is-pulled-right">
                     <span
                       className="icon"
                       style={{cursor: "pointer"}}
                       onClick={this.onEdit}
                     >
                       <i title="Edit" className="fa fa-lg fa-edit"></i>
                     </span>
                   </span>
               )
            }
              <p>
                {comment}
              </p>
            </div>
        ) : (
            <div className="field">
              <textarea
                className="textarea"
                value={newComment}
                onChange={this.onChange}
              />
              <div className="help is-danger">{errors.comment}</div>
              <div className="buttons">
                <button
                  className="button is-info"
                  onClick={this.onSubmit}
                >Edit</button>
                <button
                  className="button is-danger"
                  onClick={this.onCancel}
                >Cancel</button>
              </div>
            </div>
        );
    }
}

export default ItemComment;
