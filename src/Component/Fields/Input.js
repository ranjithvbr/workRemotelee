import React, { useCallback, useEffect, useState } from "react";
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
  onBlur
}) {
  const [state, setState] = useState("");

  useEffect(() => {
    setState(value);
  }, [value]);

  const handleChange = useCallback(
    (e) => {
      setState(e.target.value);
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className="inputContainer">
      {label && (
        <label>
          {label} {required && <span className="requiredSymbol">*</span>}
        </label>
      )}
      <input
        name={name}
        value={state}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
      />
      <span className="errMsg">{errMsg}</span>
    </div>
  );
}

export default Input;
