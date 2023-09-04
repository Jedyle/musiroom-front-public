import React from 'react';

const FormBuilder = ({config, onSubmit}) => (
    <form onSubmit={(e) => {e.preventDefault(); onSubmit(e);}}>

      <p className="help is-danger">{config.nonFieldErrors}</p>

      { config.fields.map((field) => {
          let { verboseName, icon, error, inputType, placeholder, value, onChange, helpText, ...other} = field;
          return (
              <div className="field">
                <label className="label">{verboseName}</label>
                <div className={`control ${icon && 'has-icons-left'} has-icons-right`}>
                  <input className={`input ${error && 'is-danger'}`} type={inputType} placeholder={placeholder} value={value} onChange={onChange} {...other}  />
                  {icon &&
                   <span className="icon is-small is-left">
                     {icon}
                   </span>
                  }
                  {error &&
                   (
                       <span className="icon is-small is-right">
                         <i className="fa fa-exclamation-triangle"></i>
                       </span>
                   )
                  }
                </div>
                {helpText &&
                 <p className="help">{helpText}</p>
                }
                <p className="help is-danger">{error}</p>
              </div>
          );
      })}

      <div className="field is-grouped">
        <div className="control is-expanded">
          {config.buttons.map((button) => (
              <button
                className={`button ${button.classes}`}
                onClick={button.onClick}
              >
                {button.text}
              </button>
          ))}
        </div>
      </div>

    </form>
);

export default FormBuilder;
