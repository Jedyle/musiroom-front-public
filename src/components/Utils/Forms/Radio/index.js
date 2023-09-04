import React from 'react';

const Radio = ({
    name,
    types,
    value,
    onChange,
    errorMessages='',
    successMessages=''
}) => (
    <div className="field is-narrow">
      <div className="control">
        {
            types.map((type) => (
                <label className="radio">
                  <input type="radio"
                         name={name}
                         value={type.value}
                         onChange={onChange}
                         checked={value === type.value}
                  />
                  {type.label}
                </label>
            ))
        }
      </div>
      <p className="help is-success">{successMessages}</p>
      <p className="help is-danger">{errorMessages}</p>
    </div>
);

export default Radio;
