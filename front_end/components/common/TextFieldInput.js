import React from "react";
import classnames from "classnames";

function TextFieldInput(props) {
  const {
    type,
    id,
    name,
    className,
    error,
    onChange,
    placeholder,
    style,
    value,
    lblText,
    infoText,
  } = props;

  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={classnames(`form-control rounded-4 ${className}`, {
          "is-invalid": error,
        })}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        style={style}
      />
      {lblText && <label htmlFor={id}>{lblText}</label>}
      {infoText && (
        <div id={`${id}Help`} className="form-text">
          {infoText}
        </div>
      )}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default TextFieldInput;
