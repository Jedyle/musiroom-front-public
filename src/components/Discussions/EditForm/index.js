import React from 'react';

const DiscussionEditForm = ({
    nonFieldErrors,
    
    title,
    onChangeTitle,
    titleErrors,

    content,
    onChangeContent,
    contentErrors,

    onSubmit,
    onCancel
}) => (
    <form onSubmit={(e) => {e.preventDefault();}}>
      <div className="help is-danger is-size-5">{nonFieldErrors}</div>
      <br/>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Titre"
            value={title}
            onChange={onChangeTitle}
          />
        </div>
        <div className="help is-danger">{titleErrors}</div>
      </div>
      <div className="field">
        <div className="control">
          <textarea className="textarea" placeholder="Contenu"
                    style={{minHeight: '250px'}}
                    value={content}
                    onChange={onChangeContent}
          ></textarea>
        </div>
        <div className="help is-danger">{contentErrors}</div>
      </div>

      <div className="field">
        <div className="control">
          <div className="buttons">
            <button className="button is-info" onClick={onSubmit}>Modifier</button>
            <button className="button is-danger" onClick={onCancel}>Annuler</button>
          </div>
        </div>
      </div>
    </form>
);

export default DiscussionEditForm;
