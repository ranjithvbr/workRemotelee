import React from "react";
import { Checkbox as AntdCheckbox } from "antd";
import "./field.scss";

function Checkbox({ label, name, value, onChange, disabled }) {
  return (
    <div className="inputCheckbox">
      <AntdCheckbox
        type="checkbox"
        name={name}
        checked={value}
        onChange={onChange}
        disabled={disabled}
      >
        {label}
      </AntdCheckbox>
    </div>
  );
}

export default Checkbox;
