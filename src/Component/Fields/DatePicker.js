import { DatePicker as AntdDatePicker } from "antd";
import "./field.scss";

export default function DatePicker({ label, required, errMsg, disabled, onChange }) {
  return (
    <div className="datePickerContainer">
      {label && (
        <label>
          {label} {required && <span className="requiredSymbol">*</span>}
        </label>
      )}
      <AntdDatePicker disabled={disabled} onChange={(date, dateString) => onChange(dateString)} />
      <span className="errMsg">{errMsg}</span>
    </div>
  );
}
