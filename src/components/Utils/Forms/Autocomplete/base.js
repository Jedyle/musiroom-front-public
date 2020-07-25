import React from 'react';
import { truncate } from 'utils/strings';
import './index.css';

const AutocompleteInput = ({
    placeholder,
    name,
    value,
    onChange,
    autocompleteList,
    cursor,
    onKeyDown,
    onChooseItem,
    errorMessages = '',
    successMessages = '',
    additionalFieldClasses = '',
    additionalControlClasses = '',
    ...props

}) => (
    <>
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        name={name}     
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        {...props}
      />
    <div className="list" style={{position: 'absolute', zIndex: 10}}>        
        {autocompleteList.map(
            (item, index) => (
                <div
                  className={`list-item ${cursor === index && 'is-active'}`}
                  style={{cursor: 'pointer'}}
                  onClick={(e) => {onChooseItem(index);}}
                >{truncate(item, 80)}</div>
            )
        )}
      </div>
    </>
);

export default AutocompleteInput;
