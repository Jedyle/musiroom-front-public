import React from 'react';

const MessageForm = ({
    content,
    onChange,
    onSubmit,
    messagePlaceholder,
    buttonClasses
}) => (
    <form onSubmit={onSubmit}>
        <textarea
          className="textarea"
          placeholder={messagePlaceholder}
          value={content}
          onChange={onChange}
        ></textarea>
      <button className={`button mt-1 ${buttonClasses}`}>Reply</button>
    </form>
);

export default MessageForm;
