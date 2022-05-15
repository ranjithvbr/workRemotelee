import React from "react";
import { Radio } from "antd";
import "./field.scss";

function RadioButton({ onChange, value, label, disabled }) {
  return (
    <Radio
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="radioStyles"
    >
      {label}
    </Radio>
  );
}

export default RadioButton;
