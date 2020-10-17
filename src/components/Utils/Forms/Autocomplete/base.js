import React from 'react';
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
    onBlur,
    additionalFieldClasses = '',
    additionalControlClasses = '',
    additionalControlElements = null,
    ...props

}) => (
    <>
      <div className={`field ${additionalFieldClasses}`}>
        <p className={`control ${additionalControlClasses}`}>
          <input
            className="input"
            type="text"
            placeholder={placeholder}
            name={name}     
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            {...props}
          />
        </p>
        {additionalControlElements}
      </div>
      <div className="list" style={{position: 'absolute', zIndex: 10}}>        
        {autocompleteList.map(
            (item, index) => (
                <div
                  key={index}
                  className={`list-item ${cursor === index && 'is-active'}`}
                  style={{cursor: 'pointer'}}
                  onClick={(e) => {onChooseItem(index);}}
                >{item}</div>
            )
        )}
      </div>      
    </>
);

export default AutocompleteInput;
