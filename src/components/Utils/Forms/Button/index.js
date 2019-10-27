import React from 'react';

const Button = (
    {
        message,
        onClick,
        buttonClass
    }
) => (
    <div className="field is-horizontal">
      <div className="field-label">               
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <button className={`button ${buttonClass}`} onClick={onClick}>
              {message}
            </button>
          </div>
        </div>
      </div>
    </div>  
);

export default Button;
