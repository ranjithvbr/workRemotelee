import React from "react";
import { Radio } from "antd";
import "./field.scss";

function RadioButton({ onChange, value, label, disabled, helperText }) {
  return (
    <div>
      <Radio
        checked={value}
        onChange={onChange}
        disabled={disabled}
        className="radioStyles"
      >
        {label}
      </Radio>
      {helperText && <div className="radioHelperText">{helperText}</div>}
    </div>
  );
}

export default RadioButton;
