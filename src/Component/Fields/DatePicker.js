import { DatePicker as AntdDatePicker } from "antd";
import "./field.scss";

export default function DatePicker({ label, required, errMsg, disabled }) {
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    <div className="datePickerContainer">
      {label && (
        <label>
          {label} {required && <span className="requiredSymbol">*</span>}
        </label>
      )}
      <AntdDatePicker disabled={disabled} onChange={onChange} />
      <span className="errMsg">{errMsg}</span>
    </div>
  );
}
