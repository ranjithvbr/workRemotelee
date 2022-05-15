import React from "react";
import "./field.scss";

function Input({
  label,
  errMsg,
  name,
  value,
  onChange,
  placeholder,
  required,
  disabled,
}) {
  return (
    <div className="inputContainer">
      {label && (
        <label>
          {label} {required && <span className="requiredSymbol">*</span>}
        </label>
      )}
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      <span className="errMsg">{errMsg}</span>
    </div>
  );
}

export default Input;
