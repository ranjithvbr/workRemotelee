import React from "react";
import "./input.scss";

function Input({ label, errMsg, name, value, onChange, placeholder, required }) {
    return (
        <div className="inputContainer">
            {label && <label>{label} {required && <span className="requiredSymbol">*</span>}</label>}
            <input name={name} value={value} onChange={onChange} placeholder={placeholder} />
            <span>{errMsg}</span>
        </div>
    );
}

export default Input;