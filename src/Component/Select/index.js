import React, { useEffect, useState } from "react";
import "./select.scss";

function Select({ label, required, errMsg, placeholder, onChange, Options = [], disabled }) {
  const [value, setValue] = useState();

  useEffect(() => {
    onChange && onChange(Options?.[0]?.li)
  }, [Options]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value)
  }

  return (
    <div className="selectContainer">
      {label && (
        <label>
          {label} {required && <span className="requiredSymbol">*</span>}
        </label>
      )}
      <select onChange={handleChange} placeholder={placeholder} disabled={disabled} value={value || Options?.[0]?.li}>
        {Options.map((val) => {
          return <option value={val.li}>{val.li}</option>;
        })}
      </select>
      <span className="errMsg">{errMsg}</span>
    </div>
  );
}

export default Select;
