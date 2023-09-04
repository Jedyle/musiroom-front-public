import React from 'react';

const FeedbackForm = ({typeOptions, type, onChangeType, message, onChangeMessage, errors, onSubmit}) => (
    <form onSubmit={(e) => {e.preventDefault(); onSubmit(e);}}>
      <p className="help is-danger">{errors.non_field_errors}</p>

      <div className="select is-fullwidth">
        <select value={type} onChange={onChangeType}>
          {typeOptions.map(
              (option) => (
                  <option value={option.value}>{option.text}</option>
              )
          )}
        </select>
        <p className="help is-danger">{errors.type}</p>
      </div>

      <div className="field mt-1">
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Your message..."
            value={message}
            onChange={onChangeMessage}
          ></textarea>
          <p className="help is-danger">{errors.message}</p>
          <p className="help">If you need to embed attachments such as screenshots, please use an image uploader such as <b><a target="_blank" href="https://imgbb.com">imgbb</a></b> and copy the link here.</p>
        </div>
      </div>
      <button className="button is-fullwidth is-info" type="submit">Submit</button>
    </form>
);

export default FeedbackForm;
