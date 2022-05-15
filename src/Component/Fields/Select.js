import React, { useEffect } from "react";
import "./field.scss";

function Select({
  label,
  required,
  errMsg,
  placeholder,
  onChange,
  Options = [],
  disabled,
  value,
}) {
  useEffect(() => {
    onChange && onChange(Options?.[0]?.li);
  }, [Options]);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="selectContainer">
      {label && (
        <label>
          {label} {required && <span className="requiredSymbol">*</span>}
        </label>
      )}
      <select
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        value={value || Options?.[0]?.li}
      >
        {Options.map((val) => {
          return <option key={val.id} value={val.li}>{val.li}</option>;
        })}
      </select>
      <span className="errMsg">{errMsg}</span>
    </div>
  );
}

export default Select;
