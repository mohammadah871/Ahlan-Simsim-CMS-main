import React from "react";
import "./ButtonExpandComponent.css";
import icon from "../icons/imgArrowVer.png";

function ButtonExpandComponent({ bgColor, onClickCallback }) {
  return (
    <button
      dir="rtl"
      className="ButtonExpand-container"
      style={{
        cursor: "pointer",
        background: bgColor,
        justifyContent: "center",
      }}
      onClick={onClickCallback}
    >
      <img className="ButtonExpand-icon" src={icon} alt="" />
    </button>
  );
}

export default ButtonExpandComponent;
