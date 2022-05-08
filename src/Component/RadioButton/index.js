import React from "react";
import { Radio } from "antd";
import "./radiobutton.scss";

function RadioButton({ onChange, value, label }) {
  return (
    <Radio value={value} onChange={onChange} className="radioStyles">
      {label}
    </Radio>
  );
}

export default RadioButton;
