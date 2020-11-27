import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import Input from 'components/Utils/Forms/Input';

const ReviewEditModal = ({ isActive, onClose, title, onChangeTitle, content, onChangeContent, onSubmit }) =>  (
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

export default ReviewEditModal;
