import React from 'react';
import AutocompleteInput from 'components/Utils/Forms/Autocomplete';
import { truncate } from 'utils/strings';

const SubjectForm = ({
    types,
    currentType,
    onChangeType,
    currentValue,
    onChangeValue,    
    autocompleteList,
    onChooseItem,
    onBlur,
    onResetItem,
    selectedItem,
    currentTitle,
    onChangeTitle,    
    currentText,
    onChangeText,
    onCreateDiscussion,
    nonFieldErrors,
    titleErrors,
    textErrors,
    user
}) => (
    <div className="column is-12-mobile is-8-tablet is-offset-2-tablet">
      <div className="box has-background-light has-padding-20">
        <h1 className="title is-size-3 has-text-centered">Nouvelle Discussion</h1>      
        <div className="has-margin-bottom-10">
          <p className="has-text-centered">
            <span className="is-size-5">Sujet : </span>
            <span className={`tag is-large ${selectedItem ? 'is-success' : 'is-info'}`}>
              {selectedItem ?
               (
                   <>
                     {truncate(selectedItem.name, 30)}
                     <button
                       className="delete is-small"
                       onClick={onResetItem}
                     ></button>
                   </>
               ) : "Discussion Générale"}
            </span>
          </p>
        </div>
        <div className="columns">
          <div className="column is-6-desktop is-offset-3-desktop">
            <div className="has-text-centered has-margin-bottom-10">ou choisissez un sujet</div>
            <div className="field has-addons has-margin-top-6">
              <p className="control">
                <span className="select">
                  <select className="" value={currentType} onChange={onChangeType}>
                    <option value="" disabled>Type</option>
                    {types.map(
                        (type) => (
                            <option value={type.value}>{type.name}</option>
                        )
                    )}
                  </select>
                </span>
              </p>
              <p className="control is-expanded">
                <AutocompleteInput
                  className="input"
                  type="text"
                  placeholder="Sujet..."
                  disabled={!currentType}
                  value={currentValue}
                  onChange={onChangeValue}
                  autocompleteList={autocompleteList}
                  onChooseItem={onChooseItem}
                  onBlur={onBlur}
                  additionalControlClasses="has-border"
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="columns is-marginless">
        <div className="column is-2 is-1-widescreen is-offset-1-widescreen">
          <figure className="image is-square is-hidden-touch">
            <img className="is-rounded" src={user.profile.avatar} />
          </figure>
        </div>
        <div className="column box is-8">
          <div className="help is-danger is-size-5">{nonFieldErrors}</div>
          <br/>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Titre"
                value={currentTitle}
                onChange={onChangeTitle}
              />
            </div>
            <div className="help is-danger">{titleErrors}</div>
          </div>
          <div className="field">
            <div className="control">
              <textarea className="textarea" placeholder="Contenu"
                        style={{minHeight: '250px'}}
                        value={currentText}
                        onChange={onChangeText}
              ></textarea>
            </div>
            <div className="help is-danger">{textErrors}</div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-info" onClick={onCreateDiscussion}>Créer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default SubjectForm;
