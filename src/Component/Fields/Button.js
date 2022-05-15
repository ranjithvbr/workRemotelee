import React from "react";
import "./field.scss";

function Button({ title, customStyles, onClick }) {
  return (
    <button className={`${customStyles} buttonContainer`} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
