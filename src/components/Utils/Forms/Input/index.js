import React from 'react';


const Input = ({
    placeholder,
    name,
    value,
    onChange,
    type="text",
    errorMessages = '',
    successMessages = '',
    additionalFieldClasses = '',
    additionalControlClasses = '',
    ...props
}) => (
    <div className={`field ${additionalFieldClasses}`}>
      <p className={`control is-expanded ${additionalControlClasses}`}>
        <input className="input"
               name={name}
               type={type}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               {...props}
        />
      </p>
      <p className="help is-success">{successMessages}</p>
      <p className="help is-danger">{errorMessages}</p>
    </div>
);

export default Input;
