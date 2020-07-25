import React from 'react';

const CommentCreateForm = ({
    content,
    onChangeContent,
    onSubmitComment
}) => (
    <form onSubmit={onSubmitComment}>
        <textarea
          className="textarea"
          placeholder="Votre commentaire"
          value={content}
          onChange={onChangeContent}
        ></textarea>
      <button className="button is-info mt-1">Répondre</button>
    </form>
);

export default CommentCreateForm;
