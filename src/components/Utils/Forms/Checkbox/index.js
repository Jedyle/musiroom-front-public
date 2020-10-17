import React from 'react';

const CheckBox = ({
    name,
    checked,
    onChange,
    message,
    errorMessages,
    successMessages    
}) => (
    <div className="field">
      <div className="control has-padding-top-5">
        <label className="checkout">
          <input type="checkbox"
                 name={name}
                 checked={checked}
                 onChange={onChange}
          />
          {" "}{message}
        </label>
      </div>
      <p className="help is-success">{successMessages}</p>
      <p className="help is-danger">{errorMessages}</p>
    </div>
);

export default CheckBox;
