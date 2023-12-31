import React, { Component } from 'react';
import './index.css';

class AutocompleteInput extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    render(){
        let {
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
        } = this.props;

        return (
            <>
              <div>
                <div className={`field ${(additionalControlElements !== null) && 'has-addons'} ${additionalFieldClasses}`}>
                  <p className={`control ${additionalControlClasses}`}>
                    <input
                      ref={this.inputRef}
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
                            // when we click here, we don't want to trigger the input's onBlur event, since it can cause conflicts with this div's onClick event
                            onMouseDown={(e) => {e.preventDefault(); this.inputRef.current.focus();}}
                            onClick={(e) => {onChooseItem(index);}}
                          >{item}</div>
                      )
                  )}
                </div>
              </div>
            </>
        );
    }
}

export default AutocompleteInput;
