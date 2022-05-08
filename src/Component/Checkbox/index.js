import React from "react";
import { Checkbox as AntdCheckbox } from "antd";
import "./checkbox.scss";

function Checkbox({ label, name, value, onChange }) {
  return (
    <div className="inputCheckbox">
      <AntdCheckbox
        type="checkbox"
        name={name}
        value={value}
        onChange={onChange}
      >
        {label}
      </AntdCheckbox>
    </div>
  );
}

export default Checkbox;
