import React from 'react';

const CommentEditForm = ({
    content,
    onChange,
    onSubmit,
    onCancel
}) => (
    <form onSubmit={(e) => {e.preventDefault();}}>
      <textarea
        className="textarea"
        value={content}
        onChange={onChange}
      ></textarea>
      <div className="buttons">
        <button
          className="button is-small is-info mt-1"
          onClick={onSubmit}
        >Edit</button>
        <button
          className="button is-small is-danger mt-1"
          onClick={onCancel}
        >Cancel</button>
      </div>
    </form>                    
);

export default CommentEditForm;
