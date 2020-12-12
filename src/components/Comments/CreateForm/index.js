import React from 'react';
import MessageForm from 'components/Utils/Forms/MessageForm';

const CommentCreateForm = ({
    content,
    onChangeContent,
    onSubmitComment
}) => (
    <MessageForm
      content={content}
      onChange={onChangeContent}
      onSubmit={onSubmitComment}
      messagePlaceholder="Votre commentaire"
      buttonClasses="is-info"
    />
);

export default CommentCreateForm;
