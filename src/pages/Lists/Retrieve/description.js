import React from 'react';
import { getUser } from 'services/Auth/api';

export default function ListDescription({list, newDescription, isEditable, onEdit, onSubmit, onChange, onCancel}){
    let userCanEdit = (getUser() === list.user.username);

    if (isEditable){
        return (
            <div className="field">
              <textarea
                className="textarea"
                value={newDescription}
                onChange={onChange}
              />
              <div className="buttons">
                <button
                  className="button is-info"
                  onClick={onSubmit}
                >Modifier</button>
                <button
                  className="button is-danger"
                  onClick={onCancel}
                >Annuler</button>
              </div>
            </div>
        );
    }

    return (
        <div>
          <span className="is-pulled-right">
            {userCanEdit && (
                <span className="icon"
                      style={{cursor: 'pointer'}}
                      onClick={onEdit}
                >
                  <i title="Editer" className="fa fa-lg fa-edit"></i>
                </span>
            )}
          </span>
          <p className="has-text-centered">
            {list.description ||
             (userCanEdit && (
                 <em>
                   Ajouter une description
                 </em>))                       
            }
          </p>
        </div>
    );
}
