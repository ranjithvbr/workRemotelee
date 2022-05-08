import React from "react";
import "./button.scss";

function Button({title, customStyles, onClick}) {
    return(
        <button className={`${customStyles } buttonContainer`} onClick={onClick}>{title}</button>
    );
};

export default Button;