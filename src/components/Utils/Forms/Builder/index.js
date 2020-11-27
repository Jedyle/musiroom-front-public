import React from 'react';

const FormBuilder = ({config, onSubmit}) => (
    <form onSubmit={(e) => {e.preventDefault(); onSubmit(e);}}>

      <p className="help is-danger">{config.nonFieldErrors}</p>
      
      { config.fields.map((field) => (
          <div className="field">
            <label className="label">{field.verboseName}</label>
            <div className={`control ${field.icon && 'has-icons-left'} has-icons-right`}>
              <input className={`input ${field.error && 'is-danger'}`} type={field.inputType} placeholder={field.placeholder} value={field.value} onChange={field.onChange} />
              {field.icon &&
               <span className="icon is-small is-left">
                 {field.icon}
               </span>
              }
              {field.error &&
               (
                   <span className="icon is-small is-right">
                     <i className="fa fa-exclamation-triangle"></i>
                   </span>    
               )
              }                                           
            </div>
            {field.helpText &&
             <p className="help">{field.helpText}</p>
            }                        
            <p className="help is-danger">{field.error}</p>
          </div>
      ))}

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
